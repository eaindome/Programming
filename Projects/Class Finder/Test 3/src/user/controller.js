const bcrypt = require('bcrypt');
const pool = require('../../database');
const queries = require('./queries');


// Endpoint: User Login
const userLogin = (req, res) => {
    const { email, password } = req.body;

    pool.query(queries.userLogin, [email, password], (error, results) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).json({ eroor: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            const user = results.rows[0];
            // store the user's ID in the session
            req.session.userid = user.user_id;
            res.status(200).json({ message: 'Login successful' });
        }
    });
};

//  Endpoint: User Profile
const userProfile = (req, res) => {
    // assume the user information is stored in the request object after successful login
    // check if the user is authenticated (sessoin validation)

    if (!req.session.userid) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    const userId = req.session.userid;
    const user = req.session.user;

    pool.query(queries.userProfile, [userId], (error, results) => {
        if (error) {
            console.error('Error execution query: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const userProfile = results.rows[0];
            res.status(200).json(userProfile);
        }
    });
};

// Endpoint: User Logout
const userLogout = (req, res) => {
    // Destroy the session
    req.session.destroy((error) => {
      if (error) {
        console.error('Error destroying session: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
      }
    });
};

// Endpoint: User Sign Up
const userSignUp = async (req, res) => {
    const { firstname, surname, password, email, program, year } = req.body;
  
    try {
      // Check if the user already exists in the database
      const userExists = await pool.query(queries.checkUserExists, [email]);
      if (userExists.rowCount > 0) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
      // Generate the hashed password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the user into the Users table
      const programYearId = await getProgramYearId(program, year);
      const user = await pool.query(queries.userSignUp, [
        `${firstname} ${surname}`,
        hashedPassword,
        email,
        programYearId
      ]);
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Helper function to get program_year_id
  const getProgramYearId = async (program, year) => {
    try {
      const programYear = await pool.query(queries.getProgramYear, [
        program,
        year
      ]);
  
      if (programYear.rowCount > 0) {
        return programYear.rows[0].program_year_id;
      }
  
      // If program_year_id does not exist, insert a new entry into ProgramYears table
      const programId = await getProgramId(program);
      const yearId = await getYearId(year);
  
      const newProgramYear = await pool.query(queries.insertProgramYear, [
        programId,
        yearId
      ]);
  
      return newProgramYear.rows[0].program_year_id;
    } catch (error) {
      throw error;
    }
  };
  
  // Helper function to get program_id
  const getProgramId = async (program) => {
    try {
      const programData = await pool.query(queries.getProgram, [program]);
  
      if (programData.rowCount > 0) {
        return programData.rows[0].program_id;
      }
  
      throw new Error(`Program ${program} not found`);
    } catch (error) {
      throw error;
    }
  };
  
  // Helper function to get year_id
  const getYearId = async (year) => {
    try {
      const yearData = await pool.query(queries.getYear, [year]);
  
      if (yearData.rowCount > 0) {
        return yearData.rows[0].year_id;
      }
  
      throw new Error(`Year ${year} not found`);
    } catch (error) {
      throw error;
    }
  };





module.exports = {
    userLogin,
    userProfile,
    userLogout,
    userSignUp,
};