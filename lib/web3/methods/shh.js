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
 *   Fabian Vogelsteller <fabian@ethereum.org>
 *   Marek Kotewicz <marek@ethcore.io>
 * @date 2017
 */

var Method = require('../method');
var Filter = require('../filter');
var PublicChatFilter = require("./publicchatfilter.js")
var watches = require('./watches');

var Shh = function (web3) {
    this._requestManager = web3._requestManager;

    var self = this;

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });
};

Shh.prototype.newMessageFilter = function (options, callback, filterCreationErrorCallback) {
    return new Filter(options, 'shh', this._requestManager, watches.shh(), null, callback, filterCreationErrorCallback);
};

Shh.prototype.newPublicChatFilters = function (options, callback, filterCreationErrorCallback) {
    var chats = options.filters.map(function(filter) {
        return filter.chat;
    });
    var self = this;

    this.joinPublicChats({chats: chats}, function(error, filterIds) {
        if (error) {
            if (typeof filterCreationErrorCallback === 'function') {
              filterCreationErrorCallback(error);
            }
            return
        }

        var filters = filterIds.map(function(filterId, index) {
            options.filters[index].filterId = filterId;
            return new PublicChatFilter(options.filters[index], 'shh', self._requestManager, watches.shh(), null);
        })

        callback(filters);
    })
};

Shh.prototype.stopWatchingPublicChatFilters = function (options, callback, errCallback) {
    var chats = options.filters.map(function(filter) {
        filter.filter.stopWatching();
        return filter.chat;
    });
    var self = this;

    this.leavePublicChats({chats: chats}, function(error) {
        if (error) {
            if (typeof errCallback === 'function') {
              errCallback(error);
            }
            return
        }
        callback();
    })
};

var methods = function () {

    return [
        new Method({
            name: 'version',
            call: 'shh_version',
            params: 0
        }),
        new Method({
            name: 'info',
            call: 'shh_info',
            params: 0
        }),
        new Method({
            name: 'setMaxMessageSize',
            call: 'shh_setMaxMessageSize',
            params: 1
        }),
        new Method({
            name: 'setMinPoW',
            call: 'shh_setMinPoW',
            params: 1
        }),
        new Method({
            name: 'markTrustedPeer',
            call: 'shh_markTrustedPeer',
            params: 1
        }),
        new Method({
            name: 'newKeyPair',
            call: 'shh_newKeyPair',
            params: 0
        }),
        new Method({
            name: 'addPrivateKey',
            call: 'shh_addPrivateKey',
            params: 1
        }),
        new Method({
            name: 'deleteKeyPair',
            call: 'shh_deleteKeyPair',
            params: 1
        }),
        new Method({
            name: 'hasKeyPair',
            call: 'shh_hasKeyPair',
            params: 1
        }),
        new Method({
            name: 'getPublicKey',
            call: 'shh_getPublicKey',
            params: 1
        }),
        new Method({
            name: 'getPrivateKey',
            call: 'shh_getPrivateKey',
            params: 1
        }),
        new Method({
            name: 'newSymKey',
            call: 'shh_newSymKey',
            params: 0
        }),
        new Method({
            name: 'addSymKey',
            call: 'shh_addSymKey',
            params: 1
        }),
        new Method({
            name: 'generateSymKeyFromPassword',
            call: 'shh_generateSymKeyFromPassword',
            params: 1
        }),
        new Method({
            name: 'hasSymKey',
            call: 'shh_hasSymKey',
            params: 1
        }),
        new Method({
            name: 'getSymKey',
            call: 'shh_getSymKey',
            params: 1
        }),
        new Method({
            name: 'deleteSymKey',
            call: 'shh_deleteSymKey',
            params: 1
        }),

        // subscribe and unsubscribe missing

        new Method({
            name: 'post',
            call: 'shh_post',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'extPost',
            call: 'shhext_post',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'requestMessages',
            call: 'shhext_requestMessages',
            params: 1
        }),
        new Method({
            name: 'confirmMessagesProcessed',
            call: 'shhext_confirmMessagesProcessed',
            params: 1
        }),
        new Method({
            name: 'sendDirectMessage',
            call: 'shhext_sendDirectMessage',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'sendPairingMessage',
            call: 'shhext_sendPairingMessage',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'sendPublicMessage',
            call: 'shhext_sendPublicMessage',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'sendGroupMessage',
            call: 'shhext_sendGroupMessage',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'joinPublicChats',
            call: 'shhext_joinPublicChats',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'leavePublicChats',
            call: 'shhext_leavePublicChats',
            params: 1,
            inputFormatter: [null]
        })
    ];
};

module.exports = Shh;

