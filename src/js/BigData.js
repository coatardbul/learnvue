try {
    (function(d) {
        try {
            var e = d.localStorage
        } catch (b) {}
        function a(g) {
            var i = g.split(".");
            var h = i.length;
            if (i[h - 1] == "com") {
                return (i[h - 2] + "." + i[h - 1])
            } else {
                if (i[h - 1] == "cn") {
                    if (i[h - 2] == "com") {
                        return (i[h - 3] + "." + i[h - 2] + "." + i[h - 1])
                    } else {
                        return (i[h - 2] + "." + i[h - 1])
                    }
                }
            }
            return ""
        }
        var c = a(emtj_currentHostName);
        function f() {
            var g = this;
            this._ec = {};
            this.set = function(h, i) {
                g._evercookie(h, function() {}, i)
            }
            ;
            this._evercookie = function(i, h, j) {
                if (g._evercookie === undefined) {
                    g = this
                }
                g._ec.cookieData = g.evercookie_cookie(i, j);
                g._ec.localData = g.evercookie_local_storage(i, j)
            }
            ;
            this.evercookie_local_storage = function(h, i) {
                try {
                    if (e) {
                        e.setItem(h, i)
                    }
                } catch (j) {}
            }
            ;
            this.evercookie_cookie = function(i, k) {
                var h = new Date();
                var j = 7300;
                h.setTime(h.getTime() + j * 24 * 3600 * 1000);
                document.cookie = i + "=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/; domain=" + c;
                document.cookie = i + "=" + encodeURIComponent(k) + ";domain=" + c + ";path=/;expires=" + h.toGMTString()
            }
        }
        d.bigdataEvercookie = f
    }(window))
} catch (ex) {}
(function(az) {
        var ax = true;
        var aZ = true;
        if (typeof (emtj_logSet) != "undefined" && emtj_logSet.substr(0, 1) == 0) {
            ax = false
        }
        if (typeof (emtj_logSet) != "undefined" && emtj_logSet.substr(1, 1) == 0) {
            aZ = false
        }
        if (emtj_trueURL.indexOf("isTest=1&") >= 1) {
            setTimeout(function() {
                var ba = j("*[tracker-eventcode]");
                var bd = Array.prototype.slice.call(ba);
                var a9 = j("*[data-tracker-eventcode]");
                var a7 = Array.prototype.slice.call(a9);
                var be = bd.concat(a7);
                len = be.length;
                for (var a8 = 0; a8 < len; ++a8) {
                    var bc = be[a8];
                    var bb = bc.getAttribute("class");
                    var k = bc.getAttribute("tracker-eventcode") || bc.getAttribute("data-tracker-eventcode");
                    if (!bb) {
                        bb = ""
                    }
                    bc.setAttribute("class", bb + " " + k)
                }
            }, 3000);
            var aB = true;
            if (emtj_trueURL.indexOf("&openview=false") > 0) {
                aB = false
            }
            var W = T("batchNum");
            var c = T("pageId");
            var ah = W + "_" + c + "_pgresult";
            var N = true;
            var a4;
            var al = {
                result: N,
                mes: a4
            };
            if (typeof (emtj_isUpload) != "undefined" && emtj_isUpload == 0 && aB) {
                a4 = "109";
                al = {
                    result: N,
                    mes: a4
                };
                localStorage.setItem(ah, JSON.stringify(al));
                return
            }
            if (typeof (emtj_logSet) != "undefined" && !ax && aB) {
                a4 = "108";
                al = {
                    result: N,
                    mes: a4
                };
                localStorage.setItem(ah, JSON.stringify(al))
            }
        }
        if (typeof (emtj_isUpload) != "undefined" && emtj_isUpload == 0) {
            return
        }
        var aQ = az.jQuery || az.Zepto;
        var X = 0;
        var a = navigator.userAgent.toLowerCase();
        var an = false;
        if ((a.indexOf("ttjj") >= 0 || a.indexOf("eastmoney") >= 0 || a.indexOf("choiceapp") >= 0) && !(a.indexOf("hap") >= 0 && a.indexOf("com.eastmoney.marketingapp") >= 0)) {
            an = true
        }
        var aO = "st_";
        var J = "20220410";
        var aH = "";
        var L = "";
        var aL = "";
        var aU = "";
        var ab = "";
        var aT = "";
        var B = "";
        var o;
        if (typeof (emtj_sampleRate) == "undefined") {
            emtj_sampleRate = 1
        }
        if (networkProtocol.indexOf("http") >= 0 || networkProtocol.indexOf("https") >= 0) {
            if (emtj_trueURL.indexOf("isTest=1") >= 1) {
                aH = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_JS_Test.gif";
                L = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_Event_Test.gif"
            } else {
                aH = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_JS.gif";
                L = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_Event.gif";
                fingerUrl = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_EmToken.gif";
                stayUrl = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/web_other.gif";
                aL = "//bddtlog.eastmoney.com/bd-blink-server/asyncgapi/Web-FirstLoading.gif";
                aU = "//bddtlog.eastmoney.com/bd-blink-server/asyncgapi/Web-AdvExpose.gif"
            }
        } else {
            aH = "https://bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_JS.gif";
            L = "https://bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_Event.gif";
            stayUrl = "https://bdwblog.eastmoney.com/bd-blink-server/asyncgapi/web_other.gif";
            aL = "https://bddtlog.eastmoney.com/bd-blink-server/asyncgapi/Web-FirstLoading.gif";
            aU = "https://bddtlog.eastmoney.com/bd-blink-server/asyncgapi/Web-AdvExpose.gif"
        }
        var ak = "";
        var aM = "";
        var p = emtj_getUI();
        var av = "";
        var aW = "";
        var Y = "";
        var S = "";
        var a2 = "4.5.2";
        var v = false;
        var aS = "";
        var F = "";
        var aA = "";
        var b = "";
        var ae = "";
        var e = "";
        var K = "";
        var aN = "";
        var l = "";
        var am = "";
        var O = "";
        var u = "";
        var aw = "";
        var a3 = -1;
        var aj = new bigdataEvercookie();
        var A = new bigdataEvercookie();
        var aD = new bigdataEvercookie();
        try {
            var aJ = window.localStorage
        } catch (a5) {}
        var R = emtj_getCookie("qgqp_b_id");
        var t = "";
        var at = document.referrer.replace(/<\/?.+?>/g, "").replace(/[\r\n]/g, "");
        var ao = undefined;
        var U = !!(window.attachEvent && !window.opera);
        var C = document.getElementsByTagName("script");
        if (C.length > 0) {
            for (var V = 0; V < C.length; V++) {
                var g = C[V].src;
                if (g && g.indexOf("jump_tracker.js") >= 0 && g.indexOf("stg") >= 0) {
                    if (networkProtocol.indexOf("http") >= 0 || networkProtocol.indexOf("https") >= 0) {
                        if (emtj_trueURL.indexOf("isTest=1") >= 1) {
                            aH = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_JS_Test.gif";
                            L = "//bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_Event_Test.gif"
                        } else {
                            aH = "//blinkhd.eastmoney.com/bd-blink-server/asyncgapi/T_Web_JS.gif";
                            L = "//blinkhd.eastmoney.com/bd-blink-server/asyncgapi/T_Web_Event.gif";
                            fingerUrl = "//stg-bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_EmToken.gif";
                            stayUrl = "//stg-bdwblog.eastmoney.com/bd-blink-server/asyncgapi/web_other.gif";
                            aL = "//stg-bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web-FirstLoading.gif";
                            aU = "//stg-bdbklog.eastmoney.com/bd-blink-server/asyncgapi/Web-AdvExpose.gif"
                        }
                    } else {
                        aH = "https://stg-bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_JS.gif";
                        L = "https://stg-bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web_Event.gif";
                        stayUrl = "https://stg-bdwblog.eastmoney.com/bd-blink-server/asyncgapi/web_other.gif";
                        aL = "https://stg-bdwblog.eastmoney.com/bd-blink-server/asyncgapi/Web-FirstLoading.gif";
                        aU = "https://stg-bdbklog.eastmoney.com/bd-blink-server/asyncgapi/Web-AdvExpose.gif"
                    }
                }
            }
        }
        var Q = false;
        var y = false;
        var ac = "";
        var aY = "";
        if (networkProtocol.indexOf("http") < 0) {
            if (C.length > 0) {
                for (var V = 0; V < C.length; V++) {
                    var g = C[V].src;
                    if (g && g.indexOf("jump_tracker.js") >= 0) {
                        ab = C[V].getAttribute("emtj-url");
                        if (ab && ab.indexOf("http") >= 0 && ab.indexOf("//") >= 0) {
                            emtj_currentHostName = ab.split("//")[1].split("/")[0]
                        }
                    }
                }
            }
        }
        z(aO + "orirUrl");
        function aG() {
            av = m();
            aW = emtj_getCookie(aO + "si");
            if (!aW) {
                aW = emtj_getRandomStrBy(14);
                a1(aO + "si", aW)
            }
            emtj_pviUVNO = emtj_getCookie(aO + "pvi");
            Y = emtj_getCookie(aO + "sp");
            S = emtj_getCookie(aO + "inirUrl");
            if (emtj_pviUVNO) {
                a3 = 1
            } else {
                if (aJ && aJ.getItem("st_pvi")) {
                    emtj_pviUVNO = aJ.getItem("st_pvi");
                    Y = aJ.getItem("st_sp");
                    S = aJ.getItem("st_inirUrl");
                    a3 = 2
                }
            }
            if (emtj_pviUVNO) {
                aj.set("st_pvi", emtj_pviUVNO);
                if (!Y) {
                    Y = emtj_getNowFormatDate(new Date(), 2)
                }
                A.set("st_sp", Y);
                if (!S) {
                    S = document.referrer.split("?")[0]
                }
                aD.set("st_inirUrl", S)
            } else {
                aC()
            }
        }
        aG();
        function aC() {
            emtj_pviUVNO = emtj_getRandomStrBy(14);
            aj.set("st_pvi", emtj_pviUVNO);
            Y = emtj_getNowFormatDate(new Date(), 2);
            A.set("st_sp", Y);
            S = document.referrer.split("?")[0];
            aD.set("st_inirUrl", S);
            a3 = 0
        }
        function E() {
            var k = document.location.toString();
            var i = k.split("?");
            if (i.length > 1) {
                B = "?" + i[1];
                return B
            }
            return ""
        }
        function m() {
            if (networkProtocol.indexOf("http") < 0 && networkProtocol.indexOf("https") < 0) {
                return aE()
            } else {
                return window.location.href.replace(/(^\s*)|(\s*$)/g, "")
            }
        }
        function aE() {
            B = E();
            if (C.length > 0) {
                for (var i = 0; i < C.length; i++) {
                    var a7 = C[i].src;
                    if (a7 && a7.indexOf("jump_tracker.js") >= 0 || a7 && a7.indexOf("emtj_tracker.js") >= 0) {
                        ab = C[i].getAttribute("emtj-url");
                        aT = C[i].getAttribute("emtj-param")
                    }
                }
            }
            if (aT == null) {
                aT = ""
            }
            if (aT != "" && B != "") {
                aT = "&" + aT + "&isFile=1"
            } else {
                if (aT != "" && B == "") {
                    aT = "?" + aT + "&isFile=1"
                } else {
                    if (aT == "" && B == "") {
                        aT = "?isFile=1"
                    } else {
                        if (aT == "" && B != "") {
                            aT = "&isFile=1"
                        }
                    }
                }
            }
            return (ab + B + aT).replace(/(^\s*)|(\s*$)/g, "")
        }
        function P(a8, a7) {
            var i = a8.split(".");
            var k = a7.split(".");
            if (i[0] * 1 > k[0] * 1) {
                return true
            }
            if (i[0] * 1 >= k[0] * 1 && i[1] * 1 > k[1] * 1) {
                return true
            }
            if (i[0] * 1 >= k[0] * 1 && i[1] * 1 >= k[1] * 1 && i[2] * 1 > k[2] * 1) {
                return true
            }
            return false
        }
        function d() {
            var i = navigator.userAgent.toLowerCase();
            if (i.indexOf("iphone") >= 0) {
                return "iphone"
            }
            if (i.indexOf("android") >= 0) {
                return "android"
            }
            if (i.indexOf("ipad") >= 0) {
                return "ipad"
            }
            return ""
        }
        function ap(i) {
            var a7 = i.split(".");
            var k = a7.length;
            if (a7[k - 1] == "com") {
                return (a7[k - 2] + "." + a7[k - 1])
            } else {
                if (a7[k - 1] == "cn") {
                    if (a7[k - 2] == "com") {
                        return (a7[k - 3] + "." + a7[k - 2] + "." + a7[k - 1])
                    } else {
                        return (a7[k - 2] + "." + a7[k - 1])
                    }
                }
            }
            return ""
        }
        function a1(i, a8, a9) {
            var a7 = ap(emtj_currentHostName);
            if (!a9) {
                document.cookie = i + "=" + encodeURIComponent(a8) + ";domain=" + a7 + ";path=/";
                return
            }
            var k = ai(a9);
            var ba = new Date();
            ba.setTime(ba.getTime() + k * 1);
            document.cookie = i + "=" + encodeURIComponent(a8) + ";domain=" + a7 + ";path=/;expires=" + ba.toGMTString()
        }
        function ai(a7) {
            var k = a7.substring(1, a7.length) * 1;
            var i = a7.substring(0, 1);
            if (i == "s") {
                return k * 1000
            } else {
                if (i == "h") {
                    return k * 60 * 60 * 1000
                } else {
                    if (i == "d") {
                        return k * 24 * 60 * 60 * 1000
                    }
                }
            }
        }
        function z(i) {
            var k = ap(emtj_currentHostName);
            var a8 = new Date();
            a8.setTime(a8.getTime() - 1);
            var a7 = emtj_getCookie(i);
            if (a7 != null) {
                document.cookie = i + "=" + a7 + ";domain=" + k + ";path=/;expires=" + a8.toGMTString()
            }
        }
        function x(a7, a9, k, i) {
            if (i) {
                var a8 = k;
                k = function(ba) {
                    a8.call(a7, ba)
                }
            }
            if (a7.addEventListener) {
                a7.addEventListener(a9, k)
            } else {
                if (a7.attachEvent) {
                    a7.attachEvent("on" + a9, k)
                } else {
                    a7["on" + a9] = k
                }
            }
            return k
        }
        function s(k, a7, i) {
            if (k.removeEventListener) {
                k.removeEventListener(a7, i)
            } else {
                if (k.detachEvent) {
                    k.detachEvent("on" + a7, i)
                } else {
                    k["on" + a7] = null
                }
            }
        }
        function j(bj) {
            if (aQ) {
                return aQ(bj)
            }
            var bk = /([\*a-zA-Z1-6]*)?(\[(\w+)\s*(\^|\$|\*|\||~|!)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+)?\])?/
                , ba = arguments[1] || document
                , bc = bj.match(bk)
                , bk = bc[1] || "*"
                , a8 = bc[3]
                , bf = bc[4] + "="
                , bg = bc[5]
                , bh = {
                "class": "className",
                "for": "htmlFor"
            }
                , bb = []
                , k = (bk === "*" && ba.all) ? ba.all : ba.getElementsByTagName(bk)
                , a7 = k.length;
            if ((!!document.querySelectorAll) && bf != "!=") {
                k = document.querySelectorAll(bj);
                for (var bd = 0, a7 = k.length; bd < a7; bd++) {
                    bb.push(k[bd])
                }
                return bb
            }
            if (!+"\v1") {
                a8 = bh[a8] ? bh[a8] : a8
            }
            while (a7--) {
                var be = k[a7]
                    , bi = !+"\v1" ? be[a8] : be.getAttribute(a8);
                if (typeof bi === "string" && bi.length > 0) {
                    if (bg) {
                        var a9 = bf === "=" ? bi === bg : bf === "!=" ? bi != bg : bf === "*=" ? bi.indexOf(bg) >= 0 : bf === "~=" ? (" " + bi + " ").indexOf(bg) >= 0 : bf === "^=" ? bi.indexOf(bg) === 0 : bf === "$=" ? bi.slice(-bg.length) === bg : bf === "|=" ? bi === bg || bi.substring(0, bg.length + 1) === bg + "-" : false;
                        a9 && bb.push(be)
                    } else {
                        bb.push(be)
                    }
                }
            }
            return bb
        }
        function M(k, i) {
            if (typeof (emtj_syncWafArry) != "undefined") {
                ad(k, i)
            } else {
                var a8 = setInterval(function() {
                    if (typeof (emtj_syncWafArry) != "undefined") {
                        ad(k, i);
                        clearInterval(a8);
                        clearTimeout(a7)
                    }
                }, 50);
                var a7 = setTimeout(function() {
                    clearInterval(a8);
                    if (typeof (emtj_syncWafArry) != "undefined") {
                        ad(k, i)
                    }
                }, 1000)
            }
        }
        function ad(a8, a7) {
            for (var i = 0; i < emtj_syncWafArry.length; i++) {
                if (emtj_pageId == emtj_syncWafArry[i][0]) {
                    if (emtj_syncWafArry[i][1] == 1 && a7 == 1) {
                        aa(a8)
                    } else {
                        if (emtj_syncWafArry[i][2] == 1 && a7 == 2) {
                            aa(a8)
                        }
                    }
                    if (emtj_syncWafArry[i][2] == 1) {
                        y = true
                    }
                }
            }
        }
        function aI(a9) {
            var a7 = [];
            for (var i in a9) {
                a7.push(i + "=" + encodeURIComponent(a9[i]))
            }
            var ba = a7.join("&");
            aa(aH + "?" + ba);
            if (networkProtocol.indexOf("http") >= 0) {
                ac = "//" + emtj_currentHostName + "/bd-blink-server/asyncgapi/web_JS_" + emtj_pageId + ".gif"
            } else {
                if (emtj_currentHostName) {
                    ac = "https://" + emtj_currentHostName + "/bd-blink-server/asyncgapi/web_JS_" + emtj_pageId + ".gif"
                } else {
                    return
                }
            }
            var a8 = ac + "?" + ba;
            M(a8, 1);
            if (emtj_currentHostName == "xinsanban.eastmoney.com") {
                aa(a8)
            }
        }
        function T(a7) {
            var k = [];
            var bb = "";
            var bc = window.location.href.split("?")[1];
            k = bc.split("&");
            for (var a8 = 0; a8 < k.length; a8++) {
                if (k[a8].indexOf("#") == -1) {
                    bb += "&" + k[a8]
                }
            }
            var a9 = new RegExp("(^|&)" + a7 + "=([^&]*)(&|$)");
            var ba = bb.match(a9);
            if (ba != null) {
                return decodeURIComponent(ba[2])
            }
            return null
        }
        function aa(k) {
            if (emtj_trueURL.indexOf("isTest=1&") >= 1) {
                var ba = W + "_" + c + "_data";
                var a8 = localStorage.getItem(ba);
                var a7 = k + "&jsVersion=" + J;
                if (!a8) {
                    localStorage.setItem(ba, a7)
                } else {
                    localStorage.setItem(ba, a8 + "@@@@@" + a7)
                }
            }
            function bb(bc) {
                if (emtj_trueURL.indexOf("isTest=1&") >= 1) {
                    if (k.indexOf("Web_JS") > 0) {
                        ah = W + "_" + c + "_pgresult";
                        if (typeof (emtj_isUpload) == "undefined") {
                            bc = false;
                            a4 = 101
                        } else {
                            if (c != emtj_pageId) {
                                bc = false;
                                a4 = 104
                            } else {
                                if (bc == false) {
                                    a4 = 102
                                }
                            }
                        }
                    } else {
                        if (k.indexOf("Web_Event") > 0) {
                            ah = W + "_" + c + "_ecresult";
                            if (bc == false) {
                                a4 = 102
                            }
                        }
                    }
                    if (bc == true) {
                        a4 = 200
                    }
                    al = {
                        result: bc,
                        mes: a4
                    };
                    localStorage.setItem(ah, JSON.stringify(al))
                }
            }
            var i = new Image();
            var a9 = "_img_" + Math.random();
            window[a9] = i;
            i.onload = function() {
                window[a9] = null;
                bb(true)
            }
            ;
            i.onerror = function(bc) {
                window[a9] = null;
                bb(false)
            }
            ;
            i.src = k + "&jsVersion=" + J
        }
        function ag(a9, a7, a8, i, k) {
            X++;
            o = emtj_userActionId + "-" + a8 + "-" + X;
            av = m();
            a1(aO + "asi", o);
            aa(L + "?elem=" + a9 + "&EventType=" + a7 + "&EventCode=" + encodeURIComponent(a8) + "&ExtInfo=" + encodeURIComponent(i) + "&UID=" + p + "&UVNO=" + emtj_pviUVNO + "&url=" + encodeURIComponent(av) + "&rUrl=" + encodeURIComponent(at) + "&gtu=" + encodeURIComponent(k) + "&deviceId=" + F + "&deviceType=" + aA + "&tradeID=" + b + "&tradeIDType=" + ae + "&phoneModle=" + e + "&preEventCode=" + K + "&gt=" + aN + "&appKey=" + am + "&deviceBrand=" + O + "&phoneAppVersion=" + l + "&appSeid=" + u + "&appEuid=" + aw + "&sr=" + emtj_sampleRate + "&pi=" + emtj_pageId + "&mt=" + encodeURIComponent(o) + "&passc=" + R + "&cerr=" + aM);
            if (networkProtocol.indexOf("http") >= 0) {
                aY = "//" + emtj_currentHostName + "/bd-blink-server/asyncgapi/web_Event_" + emtj_pageId + ".gif"
            } else {
                if (emtj_currentHostName) {
                    aY = "https://" + emtj_currentHostName + "/bd-blink-server/asyncgapi/web_Event_" + emtj_pageId + ".gif"
                } else {
                    console.log("落地包没有设置url,return ");
                    return
                }
            }
            var ba = aY + "?elem=" + a9 + "&EventType=" + a7 + "&EventCode=" + encodeURIComponent(a8) + "&ExtInfo=" + encodeURIComponent(i) + "&UID=" + p + "&UVNO=" + emtj_pviUVNO + "&url=" + encodeURIComponent(av) + "&rUrl=" + encodeURIComponent(at) + "&gtu=" + encodeURIComponent(k) + "&deviceId=" + F + "&deviceType=" + aA + "&tradeID=" + b + "&tradeIDType=" + ae + "&phoneModle=" + e + "&preEventCode=" + K + "&gt=" + aN + "&appKey=" + am + "&deviceBrand=" + O + "&phoneAppVersion=" + l + "&appSeid=" + u + "&appEuid=" + aw + "&sr=" + emtj_sampleRate + "&pi=" + emtj_pageId + "&mt=" + encodeURIComponent(o) + "&passc=" + R + "&cerr=" + aM;
            if (y) {
                aa(ba)
            } else {
                M(ba, 2)
            }
            if (emtj_currentHostName == "xinsanban.eastmoney.com") {
                aa(ba)
            }
        }
        function w(k) {
            var a7 = [];
            for (var a8 = 0; a8 < k.length; a8++) {
                if (a7.indexOf(k[a8]) == -1) {
                    a7.push(k[a8])
                }
            }
            return a7
        }
        function aP(i) {
            return i.split("").reverse().join("")
        }
        function a0(i, k) {
            if (!k) {
                k = ""
            }
            av = m();
            aa(aL + "?url=" + encodeURIComponent(av) + "&pi=" + emtj_pageId + "&pvi=" + emtj_pviUVNO + "&mt=" + emtj_userActionId + "&ui=" + p + "&ua=" + encodeURIComponent(a) + "&firstime=" + i + "&deinfo=" + encodeURIComponent(k))
        }
        function I(i) {
            av = m();
            aa(aU + "?url=" + encodeURIComponent(av) + "&rUrl=" + encodeURIComponent(at) + "&UID=" + p + "&pvi=" + emtj_pviUVNO + "&si=" + aW + "&pi=" + emtj_pageId + "&advEid=" + i + "&appKey=" + am + "&appEuid=" + aw + "&rnd=" + Math.random())
        }
        var au = function() {
            if (an) {
                k()
            } else {
                i()
            }
            function i() {
                var ba = new Date();
                var a7 = {};
                a7.url = av;
                a7.rUrl = at;
                a7.si = aW;
                a7.sn = parseInt(emtj_getCookie(aO + "sn")) + 1;
                if (!a7.sn) {
                    a7.sn = 1
                }
                a1(aO + "sn", a7.sn);
                a7.scr = window.screen.width + "x" + window.screen.height;
                a7.dpr = window.devicePixelRatio;
                var bc = "";
                if (navigator.language) {
                    bc = navigator.language
                } else {
                    bc = navigator.browserLanguage
                }
                a7.lg = bc;
                a7.tz = "" + (ba.getTimezoneOffset() / 60 * -1);
                if (typeof (emtj_startTime) != "undefined") {
                    var bb = emtj_startTime
                } else {
                    bb = 0
                }
                a7.domreadyt = emtj_endTime - bb;
                a7.wt = -1;
                if (window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance) {
                    var be = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
                    a7.domreadyt = be.timing.domContentLoadedEventEnd - be.timing.navigationStart;
                    a7.wt = be.timing.responseStart - be.timing.navigationStart
                }
                var a9 = emtj_getCookie(aO + "psi");
                var a8 = emtj_getCookie(aO + "asi");
                if (!a9) {
                    a7.psi = ""
                } else {
                    a7.psi = a9
                }
                if (!a8) {
                    a7.asi = ""
                } else {
                    a7.asi = a8
                }
                a1(aO + "psi", emtj_userActionId);
                a1(aO + "asi", "delete");
                a7.ui = p;
                a7.deviceId = "";
                a7.deviceType = "";
                var bf = emtj_getCookie("fund_trade_trackid");
                if (!bf || bf == "undefined" || bf == undefined) {
                    a7.tradeID = "";
                    a7.tradeIDType = ""
                } else {
                    a7.tradeID = bf;
                    a7.tradeIDType = 2
                }
                a7.phoneModle = "";
                a7.preEventCode = "";
                a7.gt = "";
                a7.phoneAppVersion = "";
                a7.appKey = "";
                a7.deviceBrand = "";
                a7.appSeid = "";
                a7.appEuid = "";
                if (v == true) {
                    return
                } else {
                    if (aS != "") {
                        p = a7.ui = emtj_appUID;
                        a7.deviceId = F;
                        a7.deviceType = aA;
                        a7.tradeID = b;
                        a7.tradeIDType = ae;
                        a7.phoneModle = e;
                        a7.preEventCode = K;
                        a7.gt = aN;
                        a7.phoneAppVersion = l;
                        a7.appKey = am;
                        a7.deviceBrand = O;
                        a7.appSeid = u;
                        a7.appEuid = aw
                    }
                }
                a7.pi = emtj_pageId;
                a7.mt = emtj_userActionId;
                a7.err = ak;
                a7.passc = R;
                if (t != "") {
                    a7.oInfo = t
                } else {
                    if (typeof (emtj_otherinfo) != "undefined") {
                        t = JSON.stringify(emtj_otherinfo)
                    }
                }
                a7.oInfo = t;
                a7.pvi = emtj_pviUVNO;
                a7.sp = Y;
                a7.orirUrl = S;
                var bd = {
                    getWay: a3,
                    pageTitle: document.title
                };
                a7.extinfo = JSON.stringify(bd);
                aI(a7)
            }
            function k() {
                function ba(bg) {
                    var bg = bg;
                    var bh = document.createElement("iframe");
                    bh.style.width = "1px";
                    bh.style.height = "1px";
                    bh.style.display = "none";
                    bh.src = bg;
                    document.body.appendChild(bh);
                    setTimeout(function() {
                        bh.remove()
                    }, 1000)
                }
                if (a.indexOf("ttjj") >= 0) {
                    var bb = a.match(/ttjj\/(.*)[\s]*/);
                    if (bb != null) {
                        l = bb = bb[1];
                        window.logsession = function(bg) {
                            aS = JSON.stringify(bg);
                            try {
                                if (!bg.DeviceId) {
                                    F = ""
                                } else {
                                    F = window.btoa(aP(emtj_getRandomStrBy(6) + "-" + bg.DeviceId))
                                }
                                emtj_appUID = bg.UID;
                                aA = bg.DeviceType;
                                b = bg.TradeID;
                                if (b != "") {
                                    ae = 2
                                } else {
                                    ae = ""
                                }
                                K = bg.preEventCode;
                                if (!bg.preEventCode) {
                                    K = ""
                                }
                                if (!bg.phoneModle) {
                                    e = ""
                                } else {
                                    e = bg.phoneModle
                                }
                                if (!bg.deviceBrand) {
                                    O = ""
                                } else {
                                    O = bg.deviceBrand
                                }
                                if (!bg.appKey) {
                                    am = ""
                                } else {
                                    am = bg.appKey
                                }
                                if (!bg.euid) {
                                    aw = ""
                                } else {
                                    aw = window.btoa(aP(emtj_getRandomStrBy(6) + "-" + bg.euid))
                                }
                            } catch (bh) {
                                ak = bh
                            }
                            v = false;
                            i()
                        }
                        ;
                        if (P(bb, a2)) {
                            v = true;
                            ba('emfundapp:applogsession({"callbackMethodName":"logsession"})')
                        } else {
                            v = false;
                            i()
                        }
                    }
                } else {
                    if (a.indexOf("choiceapp") >= 0) {
                        var a7 = function() {
                            ChoiceWindow.getUserInfo(function(bg) {
                                aS = JSON.stringify(bg);
                                try {
                                    emtj_appUID = bg.uid;
                                    if (!bg.deviceId) {
                                        F = ""
                                    } else {
                                        F = window.btoa(aP(emtj_getRandomStrBy(6) + "-" + bg.deviceId))
                                    }
                                    if (!bg.eUid) {
                                        aw = ""
                                    } else {
                                        aw = window.btoa(aP(emtj_getRandomStrBy(6) + "-" + bg.eUid))
                                    }
                                    aA = bg.source;
                                    l = bg.appVersion
                                } catch (bh) {
                                    ak = bh
                                }
                                i()
                            })
                        };
                        var bc = setInterval(function() {
                            if (window.ChoiceWindow) {
                                clearInterval(bc);
                                clearTimeout(bf);
                                a7()
                            }
                        }, 100);
                        var bf = setTimeout(function() {
                            clearInterval(bc);
                            if (window.ChoiceWindow) {
                                a7()
                            } else {
                                i()
                            }
                        }, 500)
                    } else {
                        if (a.indexOf("eastmoney") >= 0) {
                            var a8 = true;
                            v = true;
                            setonReady = setTimeout(function() {
                                a8 = false;
                                v = false;
                                i()
                            }, 1000);
                            window.cb_appinfo = function(bg) {
                                aS = bg;
                                var bi = JSON.parse(bg.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r"));
                                try {
                                    if (!bi.data.deviceInfo.deviceID) {
                                        F = ""
                                    } else {
                                        F = window.btoa(aP(emtj_getRandomStrBy(6) + "-" + bi.data.deviceInfo.deviceID))
                                    }
                                    if (!bi.data.passport || !bi.data.passport.uid) {
                                        emtj_appUID = ""
                                    } else {
                                        emtj_appUID = bi.data.passport.uid
                                    }
                                    aA = bi.data.deviceInfo.deviceType;
                                    if (!bi.data.trade || !bi.data.trade.length || !bi.data.trade[0].tradeCustomId) {
                                        b = "";
                                        ae = ""
                                    } else {
                                        b = bi.data.trade[0].tradeCustomId;
                                        ae = 1
                                    }
                                    e = bi.data.deviceInfo.phoneModle;
                                    if (!bi.data.deviceInfo.gToken) {
                                        aN = ""
                                    } else {
                                        aN = bi.data.deviceInfo.gToken
                                    }
                                    l = bi.data.deviceInfo.appversion;
                                    if (!bi.data.deviceInfo.appKey && bi.data.deviceInfo.ProductType == "uufund") {
                                        am = "62yhha34"
                                    } else {
                                        if (!bi.data.deviceInfo.appKey) {
                                            am = ""
                                        } else {
                                            am = bi.data.deviceInfo.appKey
                                        }
                                    }
                                    if (!bi.data.deviceInfo.deviceBrand) {
                                        O = ""
                                    } else {
                                        O = bi.data.deviceInfo.deviceBrand
                                    }
                                    K = "";
                                    if (!bi.data.deviceInfo.appSessionid) {
                                        u = ""
                                    } else {
                                        u = bi.data.deviceInfo.appSessionid
                                    }
                                    if (!bi.data.deviceInfo.euid) {
                                        aw = ""
                                    } else {
                                        aw = window.btoa(aP(emtj_getRandomStrBy(6) + "-" + bi.data.deviceInfo.euid))
                                    }
                                } catch (bh) {
                                    ak = bh
                                }
                                if (a8) {
                                    clearTimeout(setonReady);
                                    v = false;
                                    i()
                                }
                            }
                            ;
                            var a9 = '{"callbackname": "cb_appinfo","type": "passport,deviceInfo,trade"}';
                            function bd() {
                                if (/(iPhone|iPod|iPad|iTouch|iOS)/i.test(navigator.userAgent)) {
                                    return true
                                } else {
                                    return false
                                }
                            }
                            function be() {
                                if (bd()) {
                                    if (emtj_currentHostName == "gubatestapi.eastmoney.com" || emtj_currentHostName == "gubaapi.eastmoney.com" || emtj_currentHostName == "gubaapihttps.eastmoney.com") {
                                        if (a.indexOf("appversion_") >= 0) {
                                            ba("h5GetModuleInfo:" + a9)
                                        } else {
                                            clearTimeout(setonReady);
                                            a8 = false;
                                            v = false;
                                            i()
                                        }
                                    } else {
                                        ba("h5GetModuleInfo:" + a9)
                                    }
                                } else {
                                    prompt("h5GetModuleInfo", a9 + "$&&$java.lang.String")
                                }
                            }
                            be()
                        }
                    }
                }
            }
        };
        var af = function() {
            function i() {
                var a8 = d();
                if (a8) {
                    var a7 = {
                        tap: function(bb, bc) {
                            var ba, a9, bd = 10;
                            bb.addEventListener("touchstart", function(bf) {
                                var be = bf.targetTouches[0];
                                ba = be.pageX;
                                a9 = be.pageY
                            }, false);
                            bb.addEventListener("touchend", function(bg) {
                                var bf = bg.changedTouches[0]
                                    , be = bf.pageX
                                    , bh = bf.pageY;
                                if (Math.abs(ba - be) < bd && Math.abs(a9 - bh) < bd) {
                                    bc()
                                }
                            }, false)
                        }
                    };
                    a7.tap(document, k)
                } else {
                    x(document.body, "mousedown", k, true)
                }
            }
            function k(bc) {
                var bd = emtj_willHandle(emtj_sampleRate);
                if (!bd) {
                    return
                }
                bc = bc || window.event;
                var bf = bc.target || bc.srcElement;
                var a8 = bf.tagName;
                var bb = 0;
                var be = bf.getAttribute("href");
                try {
                    while (!bf.getAttribute("tracker-eventcode") && !bf.getAttribute("data-tracker-eventcode") && bb < 5) {
                        if (bf == document.body || bf == document.documentElement) {
                            return
                        }
                        bb++;
                        bf = bf.parentNode
                    }
                    var ba = bf.getAttribute("tracker-eventcode") || bf.getAttribute("data-tracker-eventcode");
                    if (ba) {
                        var a7 = bf.getAttribute("tracker-extinfo") || bf.getAttribute("data-tracker-extinfo");
                        if (!be) {
                            be = ""
                        }
                        ag(a8, "click", ba, a7, be)
                    }
                } catch (a9) {
                    aM = a9
                }
            }
            i()
        };
        var a6 = function() {
            var by = -1;
            var bA = -1;
            var bv = -1;
            var be = [];
            var bu = 0;
            var a8 = mainPage = 0;
            var bi = 0;
            var bw = 0;
            var bs, bm;
            var bn = 0;
            var bl, bq;
            var bx = "in";
            var bI = false;
            var bt = 10;
            var bo = "default";
            var bF = 0;
            var br = m();
            var k = t;
            if (window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance) {
                var bp = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
                var bD = bp.timing;
                emtj_startTime = bD.navigationStart;
                bs = new Date(emtj_startTime);
                bm = emtj_getNowFormatDate(bs, 2);
                bC(emtj_startTime)
            }
            function bH() {
                if (bx == "in") {
                    bt = 10
                }
            }
            if (!Date.now) {
                Date.now = function() {
                    return new Date().getTime()
                }
            }
            var bc = ["webkit", "moz"];
            for (var bG = 0; bG < bc.length && !window.requestAnimationFrame; ++bG) {
                var bj = bc[bG];
                window.requestAnimationFrame = window[bj + "RequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame) {
                var bL = 0;
                window.requestAnimationFrame = function(bN) {
                    var bM = Date.now();
                    var i = Math.max(bL + 16, bM);
                    return setTimeout(function() {
                        bN(bL = i)
                    }, i - bM)
                }
            }
            var bJ = false;
            function bE() {
                if (bJ) {
                    return
                }
                bJ = true;
                window.requestAnimationFrame(function() {
                    bJ = false;
                    bH();
                    bF = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
                    be.push(bF)
                })
            }
            function bC(bM) {
                bF = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
                be.push(bF);
                clearInterval(window.keepStayTime);
                window.keepStayTime = setInterval(function() {
                    --bt;
                    if (bt == 0) {
                        clearInterval(keepStayTime);
                        bx = "out";
                        bI = true;
                        bo = "wait";
                        bl = new Date();
                        bq = emtj_getNowFormatDate(bl, 2);
                        ba()
                    }
                }, 1000);
                var i = {
                    tap: function(bQ, bR) {
                        var bP, bO, bS = 10;
                        bQ.addEventListener("touchstart", function(bU) {
                            var bT = bU.targetTouches[0];
                            bP = bT.pageX;
                            bO = bT.pageY
                        }, false);
                        bQ.addEventListener("touchend", function(bV) {
                            var bU = bV.changedTouches[0]
                                , bT = bU.pageX
                                , bW = bU.pageY;
                            if (Math.abs(bP - bT) < bS && Math.abs(bO - bW) < bS) {
                                bR()
                            } else {
                                if (Math.abs(bP - bT) > bS || Math.abs(bO - bW) > bS) {
                                    bR()
                                }
                            }
                        }, false)
                    }
                };
                i.tap(document, bH);
                window.addEventListener("scroll", bE, false);
                function bN(bP) {
                    var bQ = document.getElementsByTagName(bP);
                    for (var bO = 0; bO < bQ.length; bO++) {
                        if (bQ[bO].type == "text" || bQ[bO].type == "textarea" || bQ[bO].type == "select-one") {
                            bQ[bO].addEventListener("input", function() {
                                bH()
                            }, false)
                        }
                    }
                }
                bN("input");
                bN("textarea");
                bN("select")
            }
            function bd() {
                var bP = document.querySelector(".info-info");
                var bM = bP.innerText.length;
                var bO = bM / 400 * 60;
                var bN = 0;
                var bQ = bP.getElementsByTagName("img");
                if (bQ.length) {
                    var bR = 6;
                    for (var i = 0; i < bQ.length; i++) {
                        if (i >= 2) {
                            bR = 3
                        } else {
                            bR = bR - 1
                        }
                        bN = bN + bR
                    }
                }
                bw = Math.round(bO + bN)
            }
            function ba() {
                window.removeEventListener("scroll", bE, false);
                bn = (bl.getTime() - emtj_startTime) / 1000;
                if (bn < 0) {
                    return
                }
                bi = window.innerHeight || document.documentElement.clientHeight;
                a8 = document.documentElement.scrollHeight;
                if (bi) {
                    by = Math.floor(a8 / bi * 100) / 100
                }
                if (by < 0) {
                    return
                }
                if (document.querySelector(".info-info") && bi) {
                    mainPage = document.querySelector(".info-info").offsetHeight + document.querySelector(".info-info").offsetTop;
                    bA = Math.floor(mainPage / bi * 100) / 100;
                    bd()
                }
                var i = w(be);
                if (i.length > 1 && bi) {
                    bu = Math.max.apply(null, i);
                    bv = Math.floor((bu / bi + 1) * 100) / 100
                } else {
                    if (bi) {
                        bF = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
                        bv = Math.floor((bF / bi + 1) * 100) / 100
                    }
                }
                if (t != "") {
                    k = t
                } else {
                    if (typeof (emtj_otherinfo) != "undefined") {
                        k = JSON.stringify(emtj_otherinfo)
                    }
                }
                aa(stayUrl + "?url=" + encodeURIComponent(br) + "&st=" + bn + "&sd=" + bm + "&ed=" + bq + "&mt=" + emtj_userActionId + "&pvi=" + emtj_pviUVNO + "&si=" + aW + "&flag=" + bI + "&type=" + "stayTime" + "&snum=" + by + "&msc=" + bA + "&maxsc=" + bv + "&estime=" + bw + "&leavet=" + bo + "&pi=" + emtj_pageId + "&UID=" + p + "&deviceId=" + F + "&deviceType=" + aA + "&phoneModle=" + e + "&preEventCode=" + K + "&gt=" + aN + "&appKey=" + am + "&deviceBrand=" + O + "&phoneAppVersion=" + l + "&appSeid=" + u + "&appEuid=" + aw + "&oInfo=" + encodeURIComponent(k) + "&rnd=" + Math.random())
            }
            function a9() {
                if (bx == "in") {
                    bx = "out";
                    clearInterval(keepStayTime);
                    ba()
                }
            }
            if (a.indexOf("iphone") >= 0 || a.indexOf("ipad") >= 0 || a.indexOf("android") >= 0) {
                window.addEventListener("pagehide", bz, false)
            } else {
                window.addEventListener("beforeunload", a7, false)
            }
            function bz() {
                bo = "pagehide";
                bl = new Date();
                bq = emtj_getNowFormatDate(bl, 2);
                a9()
            }
            function a7() {
                bo = "beforeunload";
                bl = new Date();
                bq = emtj_getNowFormatDate(bl, 2);
                a9()
            }
            var bk = !!(window.history && history.pushState);
            if (bk) {
                var bK = function(i) {
                    var bM = window.history[i];
                    return function() {
                        var bO = bM.apply(this, arguments);
                        var bN = new Event(i.toLowerCase());
                        bN.arguments = arguments;
                        window.dispatchEvent(bN);
                        return bO
                    }
                };
                window.history.pushState = bK("pushState");
                window.history.replaceState = bK("replaceState")
            }
            window.addEventListener("pushstate", bb, false);
            window.addEventListener("replacestate", bb, false);
            window.addEventListener("popstate", bb, false);
            function bb(i) {
                bl = new Date();
                bq = emtj_getNowFormatDate(bl, 2);
                bo = "spa";
                a9();
                emtj_startTime = new Date().getTime();
                bs = new Date(emtj_startTime);
                bm = emtj_getNowFormatDate(bs, 2);
                bn = 0;
                bI = false;
                bt = 10;
                bx = "in";
                bo = "default";
                be = [];
                bA = -1;
                bw = 0;
                br = m();
                bC(emtj_startTime)
            }
            function bh() {
                var bN = ["webkit", "moz", "ms", "o"];
                if ("hidden"in document) {
                    return "hidden"
                }
                for (var bM = 0; bM < bN.length; bM++) {
                    if ((bN[bM] + "Hidden")in document) {
                        return bN[bM] + "Hidden"
                    }
                }
                return null
            }
            var bg = bh();
            if (bg) {
                var bB = bg.replace(/[H|h]idden/, "") + "visibilitychange";
                document.addEventListener(bB, bf, false)
            }
            function bf() {
                if (document[bh()]) {
                    bl = new Date();
                    bq = emtj_getNowFormatDate(bl, 2);
                    bo = "visibilitychange";
                    a9()
                } else {
                    emtj_startTime = new Date().getTime();
                    bs = new Date(emtj_startTime);
                    bm = emtj_getNowFormatDate(bs, 2);
                    bn = 0;
                    bI = false;
                    bt = 10;
                    bx = "in";
                    bo = "default";
                    be = [];
                    bA = -1;
                    bw = 0;
                    br = m();
                    bC(emtj_startTime)
                }
            }
        };
        var r = false;
        if (typeof (emtj_stayTimeArry) != "undefined") {
            for (var V = 0; V < emtj_stayTimeArry.length; V++) {
                if (emtj_pageId == emtj_stayTimeArry[V]) {
                    r = true
                }
            }
        }
        if (r) {
            if (emtj_trueURL.indexOf("isTest=1&") < 0) {
                try {
                    a6()
                } catch (aF) {}
            }
        }
        function h(a7) {
            var a9 = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var bd = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var bc = Math.round(a7.getBoundingClientRect().top);
            var a8 = Math.round(a7.getBoundingClientRect().left);
            var k = Math.round(a7.getBoundingClientRect().width);
            var bf = Math.round(a7.getBoundingClientRect().height);
            var be = Math.round(a7.getBoundingClientRect().right);
            var i = Math.round(a7.getBoundingClientRect().bottom);
            if ((a8 < bd && a8 > -k) && (bc < a9 && bc > -bf)) {
                var ba = 0;
                var bb = k * bf;
                if (a8 >= 0 && bc >= 0 && i > a9 && be < bd) {
                    ba = (k * (a9 - bc)) / bb
                } else {
                    if (a8 >= 0 && bc >= 0 && i > a9 && be >= bd) {
                        ba = ((bd - a8) * (a9 - bc)) / bb
                    } else {
                        if (a8 >= 0 && bc >= 0 && be > bd) {
                            ba = ((bd - a8) * bf) / bb
                        } else {
                            if (a8 >= 0 && bc >= 0 && be <= bd) {
                                ba = (k * bf) / bb
                            } else {
                                if (a8 >= 0 && bc <= 0 && be > bd) {
                                    ba = ((bd - a8) * i) / bb
                                } else {
                                    if (a8 >= 0 && bc <= 0 && be <= bd) {
                                        ba = (k * i) / bb
                                    } else {
                                        if (a8 <= 0 && bc >= 0 && be >= bd) {
                                            ba = (bd * bf) / bb
                                        } else {
                                            if (a8 <= 0 && bc <= 0 && be >= bd) {
                                                ba = (bd * i) / bb
                                            } else {
                                                if (a8 <= 0 && bc >= 0 && i > a9) {
                                                    ba = (be * (a9 - bc)) / bb
                                                } else {
                                                    if (a8 <= 0 && bc >= 0 && i <= a9) {
                                                        ba = (be * bf) / bb
                                                    } else {
                                                        if (a8 <= 0 && bc <= 0) {
                                                            ba = (be * i) / bb
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return ba == 1
            }
        }
        function aX() {
            for (var a7 = 0; a7 < H.length; a7++) {
                if (h(H[a7])) {
                    var ba = H[a7].tagName;
                    var a8 = H[a7].getAttribute("data-expose-adveid");
                    I(a8);
                    if (D.indexOf(H[a7]) > -1) {
                        D.splice(D.indexOf(H[a7]), 1)
                    }
                    var a9 = H[a7].parentNode;
                    if (H.indexOf(a9) >= 0) {
                        var k = a9.getAttribute("data-expose-adveid");
                        I(k);
                        H.splice(H.indexOf(a9), 1);
                        a7 = a7 - 1
                    }
                    if (D.indexOf(a9) >= 0) {
                        D.splice(D.indexOf(a9), 1)
                    }
                    H.splice(a7, 1);
                    a7 = a7 - 1
                }
            }
        }
        var n = j("*[data-expose-adveid]");
        var H = Array.prototype.slice.call(n);
        var aR = H.slice(0);
        var D = [];
        var q = false;
        var aq = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var G = function(a9) {
            for (var bb = 0; bb < a9.length; bb++) {
                if (a9[bb].type == "childList") {
                    var a8 = a9[bb].target.children;
                    for (var a7 = 0; a7 < a8.length; a7++) {
                        if (D.indexOf(a8[a7]) < 0 && a8[a7].getAttribute("data-expose-adveid")) {
                            D.push(a8[a7]);
                            if (aR.indexOf(a8[a7]) < 0) {
                                aR.push(a8[a7])
                            }
                        }
                    }
                } else {
                    if (a9[bb].type == "attributes") {
                        var i = a9[bb].target.children;
                        if (i.length > 0) {
                            for (var ba = 0; ba < i.length; ba++) {
                                if (H.indexOf(i[ba]) > -1 && D.indexOf(i[ba]) < 0) {
                                    D.push(i[ba])
                                }
                            }
                        }
                        if (H.indexOf(a9[bb].target) > -1 && D.indexOf(a9[bb].target) < 0) {
                            D.push(a9[bb].target)
                        }
                    }
                }
                setTimeout(function() {
                    for (var k = 0; k < D.length; k++) {
                        if (h(D[k])) {
                            var be = D[k].getAttribute("data-expose-adveid");
                            I(be);
                            if (H.indexOf(D[k]) > -1) {
                                H.splice(H.indexOf(D[k]), 1)
                            }
                            var bd = D[k].parentNode;
                            if (H.indexOf(bd) > -1) {
                                var bc = bd.getAttribute("data-expose-adveid");
                                I(bc);
                                H.splice(H.indexOf(bd), 1)
                            }
                            if (D.indexOf(bd) > -1) {
                                D.splice(D.indexOf(bd), 1);
                                k = k - 1
                            }
                            D.splice(k, 1);
                            k = k - 1
                        }
                    }
                }, 500)
            }
        };
        if (aq) {
            var Z = new aq(G)
        }
        function aV(a7) {
            var k = {
                attributes: true,
                childList: true,
                subtree: true
            };
            for (var i = 0; i < a7.length; i++) {
                Z.observe(a7[i], k)
            }
        }
        var aK = function() {
            aX();
            if (aR.length > 0) {
                aV(aR)
            }
            var a9 = setInterval(function() {
                if (D.length == 0) {
                    clearInterval(a9);
                    Z.disconnect()
                }
            }, 6000);
            x(window, "scroll", a7, false);
            if (!Date.now) {
                Date.now = function() {
                    return new Date().getTime()
                }
            }
            var bc = ["webkit", "moz"];
            for (var ba = 0; ba < bc.length && !window.requestAnimationFrame; ++ba) {
                var a8 = bc[ba];
                window.requestAnimationFrame = window[a8 + "RequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame) {
                var bb = 0;
                window.requestAnimationFrame = function(be) {
                    var bd = Date.now();
                    var i = Math.max(bb + 16, bd);
                    return setTimeout(function() {
                        be(bb = i)
                    }, i - bd)
                }
            }
            scheduledAnimationFrame2 = false;
            function a7() {
                if (scheduledAnimationFrame2) {
                    return
                }
                scheduledAnimationFrame2 = true;
                window.requestAnimationFrame(function() {
                    scheduledAnimationFrame2 = false;
                    ay()
                })
            }
            var k = {
                tap: function(be, bf) {
                    var bd, i, bg = 10;
                    be.addEventListener("touchstart", function(bi) {
                        var bh = bi.targetTouches[0];
                        bd = bh.pageX;
                        i = bh.pageY
                    }, false);
                    be.addEventListener("touchend", function(bj) {
                        var bi = bj.changedTouches[0]
                            , bh = bi.pageX
                            , bk = bi.pageY;
                        if ((Math.abs(bd - bh) > bg || Math.abs(i - bk) > bg)) {
                            bf()
                        }
                    }, false)
                }
            };
            k.tap(document, ay)
        };
        function ay() {
            var k = j("*[data-expose-adveid]");
            var a7 = Array.prototype.slice.call(k);
            var i = true;
            for (var a8 = 0; a8 < a7.length; a8++) {
                if (aR.indexOf(a7[a8]) < 0) {
                    H.push(a7[a8]);
                    aR.push(a7[a8]);
                    if (D.indexOf(a7[a8]) < 0) {
                        D.push(a7[a8]);
                        i = false
                    }
                }
            }
            aX();
            if (D.length > 0 && !i) {
                aV(D)
            }
        }
        var ar = document.getElementsByTagName("body")[0];
        if (ar.getBoundingClientRect() && typeof (ar.getBoundingClientRect().top) === "number" && typeof (ar.getBoundingClientRect().left) === "number" && typeof (ar.getBoundingClientRect().width) === "number" && typeof (ar.getBoundingClientRect().height) === "number" && typeof (ar.getBoundingClientRect().right) === "number" && typeof (ar.getBoundingClientRect().bottom) === "number" && aq) {
            q = true
        }
        if (emtj_currentHostName == "wap.eastmoney.com" || emtj_currentHostName == "emwap.eastmoney.com" || emtj_pageId == 120300308196 || emtj_pageId == 120300308132 || emtj_currentHostName == "mguba2020-test.eastmoney.com" || emtj_currentHostName == "mguba.eastmoney.com" || emtj_currentHostName == "waptest.eastmoney.com" || emtj_currentHostName == "emtest4.eastmoney.com" || emtj_currentHostName == "vipmoney.eastmoney.com") {
            if (q) {
                aK()
            }
        }
        window.sendExposeTrackLog = function() {
            if (q) {
                ay()
            }
        }
        ;
        if (emtj_trueURL.indexOf("isTest=1") >= 1) {
            if (typeof (emtj_logSet) == "undefined" && aB) {
                au()
            }
            if (typeof (emtj_logSet) != "undefined" && ax && aB) {
                au()
            }
            if (typeof (emtj_logSet) != "undefined" && aZ) {
                af()
            }
        } else {
            if (typeof (emtj_logSet) == "undefined") {
                au()
            }
            if (typeof (emtj_logSet) != "undefined" && ax) {
                au()
            }
            if (typeof (emtj_logSet) != "undefined" && aZ) {
                af()
            }
        }
        window.emtjLaunch = function(i, k) {
            emtj_pageId = i || emtj_pageId;
            emtj_creUserAcId();
            t = k || "";
            aG();
            au()
        }
        ;
        window.bindPageTracker = function() {}
        ;
        window.sendTrackLog = ag;
        window.sendRequestLog = aa;
        window.sendFirstScreenLog = a0;
        while (send_arr.length) {
            var f = send_arr.shift();
            if (f[0] == "sendTrackLog") {
                ag(f[1], f[2], f[3], f[4], f[5])
            } else {
                if (f[0] == "bindPageTracker") {} else {
                    if (f[0] == "emtjLaunch") {
                        emtj_pageId = f[1] || emtj_pageId;
                        emtj_creUserAcId();
                        t = f[2] || "";
                        au()
                    } else {
                        if (f[0] == "sendRequestLog") {
                            aa(f[1])
                        } else {
                            if (f[0] == "sendFirstScreenLog") {
                                a0(f[1], f[2])
                            } else {
                                if (f[0] == "sendExposeTrackLog") {
                                    if (q) {
                                        ay()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
)(window);
