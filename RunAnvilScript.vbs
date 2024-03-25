Set WshShell = CreateObject("WScript.Shell")
gitBashPath = """C:\Program Files\Git\git-bash.exe"""
firstCommand = "anvil -b 3"
secondCommand = "cd 'C:\Users\aralm\Documents\GitHub\metatag\Solidity' && forge script ./script/Deploy.s.sol --broadcast --rpc-url=http://localhost:8545 --private-key=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --via-ir && cast send --rpc-url=http://localhost:8545 --private-key=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 'whitelistCompany(address)' 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
firstFullCommand = gitBashPath & " -c """ & firstCommand & "; exec bash"""
WshShell.Run firstFullCommand, 0
WScript.Sleep 3000
secondFullCommand = gitBashPath & " -c """ & secondCommand & "; exec bash"""
WshShell.Run secondFullCommand, 0
Set WshShell = Nothing
