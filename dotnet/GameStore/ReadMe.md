Add it to the PATH if it's not automatically added: If you installed the tool globally but still face issues, ensure the path where global tools are installed is in your $PATH. Global tools are usually installed at ~/.dotnet/tools. Add this to your $PATH:

bash
Copy code
export PATH="$PATH:~/.dotnet/tools"