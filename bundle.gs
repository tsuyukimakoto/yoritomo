function send_question() {
}
function doPost() {
}
function draw() {
}
function set_timer() {
}
function init() {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/config.service.ts":
/*!*******************************!*\
  !*** ./src/config.service.ts ***!
  \*******************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    ConfigService.initialize = function () {
        var properties = PropertiesService.getScriptProperties();
        ConfigService.set_default_work_days();
        ConfigService.set_default_times();
        ConfigService.set_default_max_members();
        ConfigService.set_default_question_time();
        ConfigService.set_default_lottery_ratio();
    };
    ConfigService.set_default_work_days = function () {
        var properties = PropertiesService.getScriptProperties();
        var workdays = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_WORK_DAYS_OF_WEEK"]);
        if (workdays == null) {
            properties.setProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_WORK_DAYS_OF_WEEK"], _constants__WEBPACK_IMPORTED_MODULE_0__["WORK_DAYS_OF_WEEK_DEFAULT"]);
            console.info("SET DEFAULT WORKDAY TO SCRIPT PROPERTY (" + _constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_WORK_DAYS_OF_WEEK"] + ": " + _constants__WEBPACK_IMPORTED_MODULE_0__["WORK_DAYS_OF_WEEK_DEFAULT"] + ")");
        }
    };
    ConfigService.set_default_times = function () {
        var properties = PropertiesService.getScriptProperties();
        var times = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_TIMES"]);
        if (times == null) {
            properties.setProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_TIMES"], _constants__WEBPACK_IMPORTED_MODULE_0__["TIMES_DEFAULT"]);
            console.info("SET SCRIPT PROPERTY(" + _constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_TIMES"] + ":" + _constants__WEBPACK_IMPORTED_MODULE_0__["TIMES_DEFAULT"] + "), this is default and can change.");
        }
    };
    ConfigService.set_default_max_members = function () {
        var properties = PropertiesService.getScriptProperties();
        var max_members = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_MAX_MEMBERS"]);
        if (max_members == null) {
            properties.setProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_MAX_MEMBERS"], _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_MEMBERS_DEFAULT"]);
            console.info("SET SCRIPT PROPERTY(" + _constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_MAX_MEMBERS"] + ":" + _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_MEMBERS_DEFAULT"] + "), this is default and can change.");
        }
    };
    ConfigService.set_default_question_time = function () {
        var properties = PropertiesService.getScriptProperties();
        var question_time = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_QUESTION_TIME"]);
        if (question_time == null) {
            properties.setProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_QUESTION_TIME"], _constants__WEBPACK_IMPORTED_MODULE_0__["QUESTION_TIME_DEFAULT"]);
            console.info("SET SCRIPT PROPERTY(" + _constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_QUESTION_TIME"] + ":" + _constants__WEBPACK_IMPORTED_MODULE_0__["QUESTION_TIME_DEFAULT"] + "), this is default and can change.");
        }
    };
    ConfigService.set_default_lottery_ratio = function () {
        var properties = PropertiesService.getScriptProperties();
        var lottery_ratio = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_LOTTERY_RATIO"]);
        if (lottery_ratio == null) {
            properties.setProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_LOTTERY_RATIO"], _constants__WEBPACK_IMPORTED_MODULE_0__["LOTTERRY_RATIO_DEFAULT"]);
            console.info("SET SCRIPT PROPERTY(" + _constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_LOTTERY_RATIO"] + ":" + _constants__WEBPACK_IMPORTED_MODULE_0__["LOTTERRY_RATIO_DEFAULT"] + "), this is default and can change.");
        }
    };
    ConfigService.is_workday = function (today) {
        var properties = PropertiesService.getScriptProperties();
        var workdays = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_WORK_DAYS_OF_WEEK"]);
        if (workdays == null) {
            console.error("MISSING WORKDAYS, YOU SHOULD TO SET SCRIPT PROPERTY(" + _constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_WORK_DAYS_OF_WEEK"] + ") like " + _constants__WEBPACK_IMPORTED_MODULE_0__["WORK_DAYS_OF_WEEK_DEFAULT"] + ".");
            return false;
        }
        if (workdays.indexOf(_constants__WEBPACK_IMPORTED_MODULE_0__["DAYS"][today.getDay()]) >= 0)
            return true;
        return false;
    };
    ConfigService.get_trigger_argument = function (trigger_unique_id) {
        var properties = PropertiesService.getScriptProperties();
        return properties.getProperty("trigger_" + trigger_unique_id);
    };
    ConfigService.set_timer_send_question = function (properties) {
        var hourminutes = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["time_to_hourminutes"])(properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_QUESTION_TIME"]));
        var timer = new Date();
        timer.setHours(hourminutes[0]);
        timer.setMinutes(hourminutes[1]);
        ScriptApp.newTrigger('send_question')
            .timeBased()
            .at(timer)
            .create();
    };
    ConfigService.set_timer_draw = function (properties) {
        ConfigService.get_times().forEach(function (time) {
            var hourminutes = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["time_to_hourminutes"])(time);
            var timer = new Date();
            timer.setHours(hourminutes[0]);
            timer.setMinutes(hourminutes[1] - 10); // TODO Magic Number
            var trigger_unique_id = ScriptApp.newTrigger('draw')
                .timeBased()
                .at(timer)
                .create()
                .getUniqueId();
            properties.setProperty("trigger_" + trigger_unique_id, time);
        });
    };
    ConfigService.set_timer = function () {
        var properties = PropertiesService.getScriptProperties();
        // set time based trigger send_question
        ConfigService.set_timer_send_question(properties);
        // set time based trigger draw each time
        ConfigService.set_timer_draw(properties);
    };
    ConfigService.remove_timer = function (trigger_unique_id) {
        var properties = PropertiesService.getScriptProperties();
        ScriptApp.getProjectTriggers().forEach(function (trigger) {
            if (trigger.getUniqueId() === trigger_unique_id) {
                ScriptApp.deleteTrigger(trigger);
            }
        });
        properties.deleteProperty("trigger_" + trigger_unique_id);
    };
    ConfigService.get_message_post_url = function () {
        var properties = PropertiesService.getScriptProperties();
        var webhook_url = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_WEBFOOK_URL"]);
        if (webhook_url == null) {
            console.error("No WebhookURL found. You need set webhook_url to script property " + _constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_WEBFOOK_URL"] + ".");
        }
        return webhook_url;
    };
    ConfigService.get_times = function () {
        var properties = PropertiesService.getScriptProperties();
        var times = properties
            .getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_TIMES"])
            .split(',')
            .map(function (item) {
            return item.trim();
        });
        return times;
    };
    ConfigService.get_max_members = function () {
        var properties = PropertiesService.getScriptProperties();
        return Number(properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_MAX_MEMBERS"]));
    };
    ConfigService.get_lottery_ratio = function () {
        var properties = PropertiesService.getScriptProperties();
        return Number(properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_0__["PROPERTY_LOTTERY_RATIO"]));
    };
    return ConfigService;
}());



/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: ACTION_TEXT, DAYS, DAYS_TO_NO, FOLDER_NAME, LOTTERRY_RATIO_DEFAULT, MAX_MEMBERS_DEFAULT, QUESTION_TIME_DEFAULT, Operations, PROPERTY_FILE_ID, PROPERTY_FOLDER_ID, PROPERTY_LOTTERY_RATIO, PROPERTY_MAX_MEMBERS, PROPERTY_QUESTION_TIME, PROPERTY_TIMES, PROPERTY_WEBFOOK_URL, PROPERTY_WORK_DAYS_OF_WEEK, TIMES_DEFAULT, WORK_DAYS_OF_WEEK_DEFAULT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TEXT", function() { return ACTION_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAYS", function() { return DAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAYS_TO_NO", function() { return DAYS_TO_NO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FOLDER_NAME", function() { return FOLDER_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOTTERRY_RATIO_DEFAULT", function() { return LOTTERRY_RATIO_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_MEMBERS_DEFAULT", function() { return MAX_MEMBERS_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUESTION_TIME_DEFAULT", function() { return QUESTION_TIME_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Operations", function() { return Operations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_FILE_ID", function() { return PROPERTY_FILE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_FOLDER_ID", function() { return PROPERTY_FOLDER_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_LOTTERY_RATIO", function() { return PROPERTY_LOTTERY_RATIO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_MAX_MEMBERS", function() { return PROPERTY_MAX_MEMBERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_QUESTION_TIME", function() { return PROPERTY_QUESTION_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_TIMES", function() { return PROPERTY_TIMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_WEBFOOK_URL", function() { return PROPERTY_WEBFOOK_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROPERTY_WORK_DAYS_OF_WEEK", function() { return PROPERTY_WORK_DAYS_OF_WEEK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIMES_DEFAULT", function() { return TIMES_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORK_DAYS_OF_WEEK_DEFAULT", function() { return WORK_DAYS_OF_WEEK_DEFAULT; });
var Operations;
(function (Operations) {
    Operations[Operations["ADD"] = 0] = "ADD";
    Operations[Operations["MODIFY"] = 1] = "MODIFY";
    Operations[Operations["CANCEL"] = 2] = "CANCEL";
})(Operations || (Operations = {}));
var ACTION_TEXT = ['登録しました', '時間を変更しました', '諦めました'];
var DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var DAYS_TO_NO = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
};
var PROPERTY_FILE_ID = 'file_id';
var PROPERTY_FOLDER_ID = 'folder_id';
var PROPERTY_LOTTERY_RATIO = 'lottery_ratio';
var PROPERTY_MAX_MEMBERS = 'max_members';
var PROPERTY_QUESTION_TIME = 'question_time';
var PROPERTY_TIMES = 'times';
var PROPERTY_WEBFOOK_URL = 'webhook_url';
var PROPERTY_WORK_DAYS_OF_WEEK = 'work_days_of_week';
var FOLDER_NAME = 'YORITOMO-SAN-DATA';
var LOTTERRY_RATIO_DEFAULT = '100';
var MAX_MEMBERS_DEFAULT = '4';
var QUESTION_TIME_DEFAULT = '9:00';
var TIMES_DEFAULT = '11:30,12:00,12:30,13:00';
var WORK_DAYS_OF_WEEK_DEFAULT = 'MON,TUE,WED,THU,FRI'; // MON,TUE,WED,THU,FRI,SAT,SUN



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.service */ "./src/config.service.ts");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.service */ "./src/storage.service.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models */ "./src/models.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");





function send_message(data) {
    var payload = JSON.stringify(data);
    var params = {
        method: 'post',
        payload: payload
    };
    try {
        var webhook_url = _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].get_message_post_url();
        if (webhook_url == null) {
            return;
        }
        var res = UrlFetchApp.fetch(webhook_url, params);
        var content = res.getContentText('UTF-8');
    }
    catch (e) {
        console.error(e.message);
    }
}
global.send_question = function (event) {
    _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].remove_timer(event.triggerUid);
    var today = new Date();
    _storage_service__WEBPACK_IMPORTED_MODULE_1__["StorageService"].prepareStorage(today);
    var actions = [];
    var times = _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].get_times();
    times.forEach(function (val) {
        actions.push(new _models__WEBPACK_IMPORTED_MODULE_3__["Action"](val, val, 'button', "'" + val));
    });
    var data = {
        attachments: [
            {
                actions: actions,
                text: '何時に出ますか？',
                callback_id: 'yoritomo'
            }
        ]
    };
    if (_config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].is_workday(today)) {
        send_message(data);
    }
    else {
        console.info('today is not workday.');
    }
};
global.doPost = function (e) {
    var jsonData = JSON.parse(decodeURIComponent(e.parameter.payload));
    var action = _storage_service__WEBPACK_IMPORTED_MODULE_1__["StorageService"].putData(new Date(), jsonData.user.id, jsonData.user.name, jsonData.actions[0].value);
    var action_text = "<@" + jsonData.user.id + ">: " + jsonData.actions[0].value + " (" + _constants__WEBPACK_IMPORTED_MODULE_2__["ACTION_TEXT"][action] + ")";
    var replyMessage = {
        replace_original: false,
        response_type: 'in_channel',
        text: action_text
    };
    return ContentService.createTextOutput(JSON.stringify(replyMessage)).setMimeType(ContentService.MimeType.JSON);
};
global.draw = function (event) {
    var today = new Date();
    var data = _storage_service__WEBPACK_IMPORTED_MODULE_1__["StorageService"].getData(today);
    var max_members = _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].get_max_members();
    var lottery_ratio = _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].get_lottery_ratio();
    var result = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["separateData"])(data, max_members);
    var argument_time = _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].get_trigger_argument(event.triggerUid);
    _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].remove_timer(event.triggerUid);
    var message = '今日のランチは\n';
    var team_no = 0;
    _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].get_times().forEach(function (time) {
        if (argument_time !== time) {
            return;
        }
        var teams = result[time];
        if (teams && teams.length > 0) {
            message += " ----- " + time + "\n";
            teams.forEach(function (team) {
                team_no += 1;
                if (team.length > 1 && lottery(lottery_ratio))
                    message += '当たり！';
                message += " \u30C1\u30FC\u30E0 " + team_no + ": ";
                team.forEach(function (person) {
                    message += "<@" + person.userId + "> ,";
                });
                message += '\n';
            });
            message += '\n';
            send_message({ text: message });
        }
    });
};
global.set_timer = function () {
    _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].set_timer();
};
global.init = function () {
    _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].initialize();
};
function lottery(ratio) {
    if (ratio > 0) {
        return 1 == Math.ceil(Math.random() * ratio);
    }
    return false;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/*! exports provided: SlackUser, Action, PostEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlackUser", function() { return SlackUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostEvent", function() { return PostEvent; });
var SlackUser = /** @class */ (function () {
    function SlackUser(id, name) {
        this.userId = id;
        this.name = name;
    }
    return SlackUser;
}());

var Action = /** @class */ (function () {
    function Action(name, text, type, value) {
        this.name = name;
        this.text = text;
        this.type = type;
        this.value = value;
    }
    return Action;
}());

var PostEvent = /** @class */ (function () {
    function PostEvent() {
    }
    return PostEvent;
}());



/***/ }),

/***/ "./src/storage.service.ts":
/*!********************************!*\
  !*** ./src/storage.service.ts ***!
  \********************************/
/*! exports provided: StorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageService", function() { return StorageService; });
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.service */ "./src/config.service.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models */ "./src/models.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");




var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    StorageService.prepareStorage = function (today) {
        var properties = PropertiesService.getScriptProperties();
        var folder_id = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_1__["PROPERTY_FOLDER_ID"]);
        var file_id = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_1__["PROPERTY_FILE_ID"]);
        var spreadsheet;
        var folder;
        var need_new_one = false;
        var this_week_file_name = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["generate_filename"])(today);
        // prepare data folder.
        if (folder_id == null) {
            console.info('NO FOLDER FOUND');
            folder = DriveApp.createFolder(_constants__WEBPACK_IMPORTED_MODULE_1__["FOLDER_NAME"]);
            properties.setProperty(_constants__WEBPACK_IMPORTED_MODULE_1__["PROPERTY_FOLDER_ID"], folder.getId());
            console.info("CREATE FOLDER AND SET SCRIPT PROPERTY(" + _constants__WEBPACK_IMPORTED_MODULE_1__["PROPERTY_FOLDER_ID"] + ":" + folder.getId() + ")");
            _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].initialize();
        }
        else {
            folder = DriveApp.getFolderById(folder_id);
        }
        // prepare spread sheet for this week.
        if (file_id !== null) {
            spreadsheet = SpreadsheetApp.openById(file_id);
            if (this_week_file_name !== spreadsheet.getName()) {
                // need to create new one for this week.
                need_new_one = true;
                console.info("Need new data file.");
            }
        }
        if (file_id == null || need_new_one == true) {
            spreadsheet = SpreadsheetApp.create(this_week_file_name);
            Object(_utils__WEBPACK_IMPORTED_MODULE_3__["generate_sheetnames"])(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["monday_of_week"])(today)).forEach(function (val, index, ar) {
                spreadsheet.insertSheet(val, index);
            });
            var default_sheet = spreadsheet.getSheetByName('シート1');
            if (default_sheet) {
                spreadsheet.deleteSheet(default_sheet);
            }
            properties.setProperty(_constants__WEBPACK_IMPORTED_MODULE_1__["PROPERTY_FILE_ID"], spreadsheet.getId());
            console.info("CREATE Spreadsheet AND SET PROPERTY (" + _constants__WEBPACK_IMPORTED_MODULE_1__["PROPERTY_FILE_ID"] + ": " + spreadsheet.getId() + ")");
            var root_folder = DriveApp.getRootFolder();
            var spreadsheet_file = DriveApp.getFileById(spreadsheet.getId());
            folder.addFile(spreadsheet_file);
            root_folder.removeFile(spreadsheet_file);
            return true;
        }
        return false;
    };
    StorageService.modifyData = function (sheet, id, name, when) {
        var max_row = sheet.getLastRow();
        if (max_row == 0) {
            sheet.appendRow([id, name, when]);
            return _constants__WEBPACK_IMPORTED_MODULE_1__["Operations"].ADD;
        }
        var range = sheet.getRange(1, 1, max_row);
        var ids = range.getValues();
        for (var i = 0; i < ids.length; i++) {
            var value = ids[i];
            if (id == new String(value)) {
                var current_when = "'" + sheet.getRange(i + 1, 3).getValue();
                if (current_when == when) {
                    sheet.getRange(i + 1, 3).setValue('');
                    return _constants__WEBPACK_IMPORTED_MODULE_1__["Operations"].CANCEL;
                }
                else {
                    sheet.getRange(i + 1, 3).setValue(when);
                    return _constants__WEBPACK_IMPORTED_MODULE_1__["Operations"].MODIFY;
                }
            }
        }
        sheet.appendRow([id, name, when]);
        return _constants__WEBPACK_IMPORTED_MODULE_1__["Operations"].ADD;
    };
    StorageService.getSpreadSheet = function (today) {
        var properties = PropertiesService.getScriptProperties();
        var file_id = properties.getProperty(_constants__WEBPACK_IMPORTED_MODULE_1__["PROPERTY_FILE_ID"]);
        return SpreadsheetApp.openById(file_id);
    };
    StorageService.putData = function (today, id, name, when) {
        var spreadsheet = StorageService.getSpreadSheet(today);
        var sheet = spreadsheet.getSheetByName(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["generate_sheetname"])(today));
        return StorageService.modifyData(sheet, id, name, when);
    };
    StorageService.getData = function (today) {
        var properties = PropertiesService.getScriptProperties();
        var spreadsheet = StorageService.getSpreadSheet(today);
        var sheet = spreadsheet.getSheetByName(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["generate_sheetname"])(today));
        var times = _config_service__WEBPACK_IMPORTED_MODULE_0__["ConfigService"].get_times();
        var result = {};
        var max_row = sheet.getLastRow();
        if (max_row == 0)
            return result;
        times.forEach(function (val) {
            result[val] = [];
        });
        var values = sheet.getRange(1, 1, max_row, 3).getValues();
        for (var i = 0; i < values.length; i++) {
            var person = values[i];
            var id = String(person[0]);
            var name_1 = String(person[1]);
            var when = String(person[2]); // "12:00" etc
            if (when) {
                result[when].push(new _models__WEBPACK_IMPORTED_MODULE_2__["SlackUser"](id, name_1));
            }
        }
        return result;
    };
    return StorageService;
}());



/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: generate_filename, generate_sheetname, generate_sheetnames, monday_of_week, separateData, time_to_hourminutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generate_filename", function() { return generate_filename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generate_sheetname", function() { return generate_sheetname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generate_sheetnames", function() { return generate_sheetnames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monday_of_week", function() { return monday_of_week; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "separateData", function() { return separateData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time_to_hourminutes", function() { return time_to_hourminutes; });
function monday_of_week(today) {
    var firstday = today;
    var day_of_week = today.getDay();
    var diff;
    if (day_of_week == 0)
        diff = 6;
    else
        diff = day_of_week - 1;
    firstday.setDate(today.getDate() - diff); // monday
    return new Date(firstday.getTime());
}
function generate_sheetname(day) {
    return ('' +
        day.getFullYear() +
        ('0' + (day.getMonth() + 1)).slice(-2) +
        ('0' + day.getDate()).slice(-2));
}
function generate_sheetnames(today) {
    var firstday = monday_of_week(today);
    var result = [];
    for (var i = 0; i < 7; i++) {
        var d = new Date(firstday.getTime());
        d.setDate(firstday.getDate() + i);
        result.push(generate_sheetname(d));
    }
    return result;
}
function generate_filename(today) {
    return today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate();
}
function divide(data, max) {
    var teams = [];
    var team_count = Math.ceil(data.length / max);
    for (var i = 0; i < team_count; i++) {
        teams.push([]);
    }
    var j = 0;
    for (var i = data.length - 1; i >= 0; i--) {
        teams[j % team_count].push(data.splice(Math.floor(Math.random() * data.length), 1)[0]);
        j++;
    }
    return teams;
}
function separateData(data, max) {
    var result = {};
    Object.keys(data).forEach(function (val) {
        result[val] = divide(data[val], max);
    });
    return result;
}
function time_to_hourminutes(time) {
    return time.split(':').map(function (num) {
        return Number(num.trim());
    });
}



/***/ })

/******/ });