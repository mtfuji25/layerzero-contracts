// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {ProxyOFTV2} from "@layerzerolabs/solidity-examples/contracts/token/oft/v2/ProxyOFTV2.sol";

contract ProxyONEZlz is ProxyOFTV2 {
    constructor(
        address _token,
        address _lzEndpoint
    ) ProxyOFTV2(_token, 8, _lzEndpoint) {
        // nothing
    }
}
