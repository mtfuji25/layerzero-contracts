// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {OFTV2} from "@layerzerolabs/solidity-examples/contracts/token/oft/v2/OFTV2.sol";

contract ONEZlz is OFTV2 {
    constructor(
        address _lzEndpoint
    ) OFTV2("ONEZ Stablecoin", "ONEZ", 8, _lzEndpoint) {
        // nothing
    }
}
