/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file shh.js
 * @authors:
 *   Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var Method = require('../method');
var formatters = require('../formatters');
var Filter = require('../filter');
var watches = require('./watches');

var Shh = function (web3) {
    this._requestManager = web3._requestManager;

    var self = this;

    methods().forEach(function (method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });
};

Shh.prototype.filter = function (fil, callback, filterCreationErrorCallback) {
    return new Filter(this._requestManager, fil, watches.shh(), formatters.outputPostFormatter, callback, filterCreationErrorCallback);
};

var methods = function () {
    var version = new Method({
        name: 'version',
        call: 'shh_version'
    });

    var info = new Method({
        name: 'info',
        call: 'shh_info'
    });

    var setMinimumPoW = new Method({
        name: 'setMinimumPoW',
        call: 'shh_setMinimumPoW',
        params: 1
    });

    var post = new Method({
        name: 'post',
        call: 'shh_post',
        params: 1,
        inputFormatter: [formatters.inputPostFormatter]
    });

    var subscribe = new Method({
        name: 'subscribe',
        call: 'shh_subscribe',
        params: 1,
        inputFormatter: [formatters.inputSubscribeFormatter]
    });

    var unsubscribe = new Method({
        name: 'unsubscribe',
        call: 'shh_unsubscribe',
        params: 1
    });

    var getFloatingMessages = new Method({
        name: 'getFloatingMessages',
        call: 'shh_getFloatingMessages',
        params: 1
    });

    var getNewSubscriptionMessages = new Method({
        name: 'getNewSubscriptionMessages',
        call: 'shh_getNewSubscriptionMessages',
        params: 1
    });

    var newGroup = new Method({
        name: 'newGroup',
        call: 'shh_newGroup',
        params: 0
    });

    var addToGroup = new Method({
        name: 'addToGroup',
        call: 'shh_addToGroup',
        params: 0
    });

    var newKeyPair = new Method({
        name: 'newKeyPair',
        call: 'shh_newKeyPair'
    });

    var hasKeyPair = new Method({
        name: 'hasKeyPair',
        call: 'shh_hasKeyPair',
        params: 1
    });

    var getPublicKey = new Method({
        name: 'getPublicKey',
        call: 'shh_getPublicKey',
        params: 1
    });

    var getPrivateKey = new Method({
        name: 'getPrivateKey',
        call: 'shh_getPrivateKey',
        params: 1
    });

    var deleteKeyPair = new Method({
        name: 'deleteKeyPair',
        call: 'shh_deleteKeyPair',
        params: 1
    });

    var generateSymmetricKey = new Method({
        name: 'generateSymmetricKey',
        call: 'shh_generateSymmetricKey'
    });

    var addSymmetricKeyDirect = new Method({
        name: 'addSymmetricKeyDirect',
        call: 'shh_addSymmetricKeyDirect',
        params: 1
    });

    var addSymmetricKeyFromPassword = new Method({
        name: 'addSymmetricKeyFromPassword',
        call: 'shh_addSymmetricKeyFromPassword',
        params: 1
    });

    var hasSymmetricKey = new Method({
        name: 'hasSymmetricKey',
        call: 'shh_hasSymmetricKey',
        params: 1
    });

    var getSymmetricKey = new Method({
        name: 'getSymmetricKey',
        call: 'shh_getSymmetricKey',
        params: 1
    });

    var deleteSymmetricKey = new Method({
        name: 'deleteSymmetricKey',
        call: 'shh_deleteSymmetricKey',
        params: 1
    });

    return [
        version,
        info,
        setMinimumPoW,
        post,
        subscribe,
        unsubscribe,
        getFloatingMessages,
        getNewSubscriptionMessages,
        // asymmetric key management
        newKeyPair,
        hasKeyPair,
        getPublicKey,
        getPrivateKey,
        deleteKeyPair,
        // symmetric key management
        generateSymmetricKey,
        addSymmetricKeyDirect,
        addSymmetricKeyFromPassword,
        hasSymmetricKey,
        getSymmetricKey,
        deleteSymmetricKey
    ];
};

module.exports = Shh;

