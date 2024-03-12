// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/MetaTagToken.sol";
import "../src/MetaTag.sol";

contract Deploy is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy MetaTagToken
        MetaTagToken metaTagToken = new MetaTagToken(/* Constructor arguments for MetaTagToken, if any */);

        // Deploy MetaTag with the address of MetaTagToken
        MetaTag metaTag = new MetaTag(address(metaTagToken) /*, Additional constructor arguments for MetaTag, if any */);

        vm.stopBroadcast();
    }
}
