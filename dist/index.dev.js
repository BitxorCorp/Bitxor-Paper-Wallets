"use strict";
/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitxorPaperWallet = void 0;

var pdf_lib_1 = require("pdf-lib");

var fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));

var bitxor_qr_library_1 = require("bitxor-qr-library");

var encodedFont_1 = __importDefault(require("./resources/encodedFont"));

var encodedBasePdf_1 = __importDefault(require("./resources/encodedBasePdf"));

var encodedBasePrivateKeyPdf_1 = __importDefault(require("./resources/encodedBasePrivateKeyPdf"));
/**
 * Default generation hash
 */


var DEFAULT_GENERATION_HASH_SEED = "57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6";
/**
 * Printing constants
 */

var MNEMONIC_POSITION = {
  x: 184,
  y: 36
};
var ADDRESS_POSITION = {
  x: 184,
  y: 90
};
var MNEMONIC_QR_POSITION = {
  x: 264,
  y: 159,
  width: 99,
  height: 99
};
var ADDRESS_QR_POSITION = {
  x: 418,
  y: 159,
  width: 99,
  height: 99
};
/**
 * Bitxor Paper wallet class
 */

var BitxorPaperWallet =
/*#__PURE__*/
function () {
  function BitxorPaperWallet(hdAccountInfo, accountInfos, network) {
    var generationHashSeed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_GENERATION_HASH_SEED;

    _classCallCheck(this, BitxorPaperWallet);

    this.hdAccount = hdAccountInfo;
    this.accountInfos = accountInfos;
    this.network = network;
    this.generationHashSeed = generationHashSeed;
  }
  /**
   * Exports as a PDF Uin8Array
   */


  _createClass(BitxorPaperWallet, [{
    key: "toPdf",
    value: function toPdf() {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var plainPdfFile, pdfDoc, notoSansFontBytes, notoSansFont, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, account;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                plainPdfFile = new Buffer(encodedBasePdf_1["default"], "base64");
                _context.next = 3;
                return pdf_lib_1.PDFDocument.load(plainPdfFile);

              case 3:
                pdfDoc = _context.sent;
                notoSansFontBytes = new Buffer(encodedFont_1["default"], "base64");
                pdfDoc.registerFontkit(fontkit_1["default"]);
                _context.next = 8;
                return pdfDoc.embedFont(notoSansFontBytes);

              case 8:
                notoSansFont = _context.sent;
                _context.next = 11;
                return this.writeMnemonicPage(pdfDoc, notoSansFont);

              case 11:
                pdfDoc = _context.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 15;
                _iterator = this.accountInfos[Symbol.iterator]();

              case 17:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 25;
                  break;
                }

                account = _step.value;
                _context.next = 21;
                return this.writeAccountPage(account, pdfDoc);

              case 21:
                pdfDoc = _context.sent;

              case 22:
                _iteratorNormalCompletion = true;
                _context.next = 17;
                break;

              case 25:
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](15);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 31:
                _context.prev = 31;
                _context.prev = 32;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 34:
                _context.prev = 34;

                if (!_didIteratorError) {
                  _context.next = 37;
                  break;
                }

                throw _iteratorError;

              case 37:
                return _context.finish(34);

              case 38:
                return _context.finish(31);

              case 39:
                return _context.abrupt("return", pdfDoc.save());

              case 40:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 27, 31, 39], [32,, 34, 38]]);
      }));
    }
    /**
     * Writes the mnemonic page into the given pdfDoc
     * @param pdfDoc
     * @param font
     */

  }, {
    key: "writeMnemonicPage",
    value: function writeMnemonicPage(pdfDoc, font) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var pages, page, mnemonicWords, firstMnemonic, secondMnemonic, plainMnemonicQR, contactQR;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                pages = pdfDoc.getPages();
                page = pages[0];
                _context2.next = 4;
                return this.writeAddress(this.hdAccount.rootAccountAddress, page, font);

              case 4:
                mnemonicWords = this.hdAccount.mnemonic.split(" ");
                firstMnemonic = mnemonicWords.slice(0, Math.round(mnemonicWords.length / 2));
                secondMnemonic = mnemonicWords.slice(Math.round(mnemonicWords.length / 2), mnemonicWords.length);
                _context2.next = 9;
                return this.writePrivateInfo([firstMnemonic.join(" "), secondMnemonic.join(" ")], page, font);

              case 9:
                plainMnemonicQR = new bitxor_qr_library_1.MnemonicQR(this.hdAccount.mnemonic, this.network, this.generationHashSeed);
                _context2.next = 12;
                return this.writePrivateQR(plainMnemonicQR, pdfDoc, page);

              case 12:
                contactQR = new bitxor_qr_library_1.ContactQR("Root account", this.hdAccount.rootAccountPublicKey, this.network, this.generationHashSeed);
                _context2.next = 15;
                return this.writePublicQR(contactQR, pdfDoc, page);

              case 15:
                return _context2.abrupt("return", pdfDoc);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
    /**
     * Writes the account page into the given pdfDoc
     * @param account
     * @param pdfDoc
     */

  }, {
    key: "writeAccountPage",
    value: function writeAccountPage(account, pdfDoc) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var newPlainPdfFile, newPdfDoc, notoSansFontBytes, font, accountPage, accountQR, contactQR, _ref, _ref2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                newPlainPdfFile = new Buffer(encodedBasePrivateKeyPdf_1["default"], "base64");
                _context3.next = 3;
                return pdf_lib_1.PDFDocument.load(newPlainPdfFile);

              case 3:
                newPdfDoc = _context3.sent;
                notoSansFontBytes = new Buffer(encodedFont_1["default"], "base64");
                newPdfDoc.registerFontkit(fontkit_1["default"]);
                _context3.next = 8;
                return newPdfDoc.embedFont(notoSansFontBytes);

              case 8:
                font = _context3.sent;
                accountPage = newPdfDoc.getPages()[0];
                _context3.next = 12;
                return this.writeAddress(account.address, accountPage, font);

              case 12:
                _context3.next = 14;
                return this.writePrivateInfo([account.privateKey], accountPage, font);

              case 14:
                accountQR = new bitxor_qr_library_1.AccountQR(account.privateKey, this.network, this.generationHashSeed);
                _context3.next = 17;
                return this.writePrivateQR(accountQR, newPdfDoc, accountPage);

              case 17:
                contactQR = new bitxor_qr_library_1.ContactQR(account.name, account.publicKey, this.network, this.generationHashSeed);
                _context3.next = 20;
                return this.writePublicQR(contactQR, newPdfDoc, accountPage);

              case 20:
                _context3.next = 22;
                return pdfDoc.copyPages(newPdfDoc, [0]);

              case 22:
                _ref = _context3.sent;
                _ref2 = _slicedToArray(_ref, 1);
                accountPage = _ref2[0];
                pdfDoc.addPage(accountPage);
                return _context3.abrupt("return", pdfDoc);

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
    /**
     * Writes address into the given pdfDoc
     * @param address
     * @param page
     * @param font
     */

  }, {
    key: "writeAddress",
    value: function writeAddress(address, page, font) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                page.drawText(address, {
                  x: ADDRESS_POSITION.x,
                  y: ADDRESS_POSITION.y,
                  size: 12,
                  font: font,
                  color: pdf_lib_1.rgb(37, 195, 241)
                });
                return _context4.abrupt("return", page);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
    }
    /**
     * Writes private info into the pdfDoc
     * @param privateLines
     * @param page
     * @param font
     */

  }, {
    key: "writePrivateInfo",
    value: function writePrivateInfo(privateLines, page, font) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var i;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                for (i = 0; i < privateLines.length; i++) {
                  page.drawText(privateLines[i], {
                    x: MNEMONIC_POSITION.x,
                    y: MNEMONIC_POSITION.y - 16 * i,
                    size: 9,
                    font: font,
                    color: pdf_lib_1.rgb(37, 195, 241)
                  });
                }

                return _context5.abrupt("return", page);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
    }
    /**
     * Writes the private QR (mnemonic or private key) into the given pdfDoc
     * @param qr
     * @param pdfDoc
     * @param page
     */

  }, {
    key: "writePrivateQR",
    value: function writePrivateQR(qr, pdfDoc, page) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var qrBase64, png;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return qr.toBase64().toPromise();

              case 2:
                qrBase64 = _context6.sent;
                _context6.next = 5;
                return pdfDoc.embedPng(qrBase64);

              case 5:
                png = _context6.sent;
                page.drawImage(png, {
                  x: MNEMONIC_QR_POSITION.x,
                  y: MNEMONIC_QR_POSITION.y,
                  width: MNEMONIC_QR_POSITION.width,
                  height: MNEMONIC_QR_POSITION.height
                });
                return _context6.abrupt("return", page);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
    }
    /**
     * Writes the public QR into the given pdfDoc
     * @param qr
     * @param pdfDoc
     * @param page
     */

  }, {
    key: "writePublicQR",
    value: function writePublicQR(qr, pdfDoc, page) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var qrBase64, png;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return qr.toBase64().toPromise();

              case 2:
                qrBase64 = _context7.sent;
                _context7.next = 5;
                return pdfDoc.embedPng(qrBase64);

              case 5:
                png = _context7.sent;
                page.drawImage(png, {
                  x: ADDRESS_QR_POSITION.x,
                  y: ADDRESS_QR_POSITION.y,
                  width: ADDRESS_QR_POSITION.width,
                  height: ADDRESS_QR_POSITION.height
                });
                return _context7.abrupt("return", page);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
    }
  }]);

  return BitxorPaperWallet;
}();

exports.BitxorPaperWallet = BitxorPaperWallet;