import { saveProducts, getProductsByCategory } from '../models/productModel';
import pool from '../config/db';

jest.mock('../config/db', () => {
  const mockClient = {
    query: jest.fn(),
    release: jest.fn(),
  };

  return {
    __esModule: true,
    default: {
      connect: jest.fn(() => mockClient),
      query: jest.fn(),
    },
  };
});

describe('Product Model', () => {
  const mockProducts = [
    { title: 'Test Product', price: '99', imageUrl: 'https://test.com/image.jpg', link: 'https://www.amazon.com/product/1', category: 'electronics' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save products to the database in batch', async () => {
    const queryMock = pool.query as jest.Mock;

    await saveProducts(mockProducts, 'electronics');

    expect(queryMock).toHaveBeenCalledTimes(1); // Expect that pool.query was called exactly once

    // Since batch insert expects nested arrays for values, we mock that structure
    const expectedValues = [
      ['Test Product', '99', 'https://test.com/image.jpg', 'https://www.amazon.com/product/1', 'electronics'],
    ];

    expect(queryMock).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO products'),
      expect.arrayContaining([expectedValues])
    );
  });

  it('should retrieve products by category', async () => {
    const queryMock = pool.query as jest.Mock;
    
    // Mock the actual query and result
    queryMock.mockResolvedValue({ rows: mockProducts });
  
    const products = await getProductsByCategory('electronics');
    
    // Assert the retrieved products match
    expect(products).toEqual(mockProducts);
    
    // Use regex to match the query, ignoring formatting differences
    expect(queryMock).toHaveBeenCalledWith(
      expect.stringMatching(/SELECT title, price, image_url AS "imageUrl", link, category\s+FROM products\s+WHERE category = \$1;/i),
      ['electronics']
    );
  });  
});

















































// import { saveProducts, getProductsByCategory } from '../models/productModel';
// import pool from '../config/db';

// jest.mock('../config/db', () => {
//   const mockClient = {
//     query: jest.fn(),
//     release: jest.fn(),
//   };

//   return {
//     __esModule: true,
//     default: {
//       connect: jest.fn(() => mockClient),
//       query: jest.fn(),
//     },
//   };
// });

// describe('Product Model', () => {
//   const mockProducts = [
//     { title: 'Test Product', price: '99', imageUrl: 'https://test.com/image.jpg', link: 'https://www.amazon.com/product/1', category: 'electronics' },
//   ];

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should save products to the database', async () => {
//     const client = await pool.connect();
//     const queryMock = client.query as jest.Mock;

//     await saveProducts(mockProducts, 'electronics');

//     expect(queryMock).toHaveBeenCalledTimes(1);
//     expect(queryMock).toHaveBeenCalledWith(
//       expect.stringContaining('INSERT INTO products'),
//       ['Test Product', '99', 'https://test.com/image.jpg', 'https://www.amazon.com/product/1', 'electronics']
//     );
//     expect(client.release).toHaveBeenCalled();  // Ensure the client connection is released
//   });

//   it('should retrieve products by category', async () => {
//     const queryMock = pool.query as jest.Mock;
    
//     // Mock the actual query and result
//     queryMock.mockResolvedValue({ rows: mockProducts });
  
//     const products = await getProductsByCategory('electronics');
    
//     // Assert the retrieved products match
//     expect(products).toEqual(mockProducts);
    
//     // Use regex to match the query, ignoring formatting differences
//     expect(queryMock).toHaveBeenCalledWith(
//       expect.stringMatching(/SELECT title, price, image_url AS "imageUrl", link, category\s+FROM products\s+WHERE category = \$1;/i),
//       ['electronics']
//     );
//   });  
// });

