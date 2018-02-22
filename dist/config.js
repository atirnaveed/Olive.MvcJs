define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Config = /** @class */ (function () {
        function Config() {
        }
        // formats: http://momentjs.com/docs/#/displaying/format/
        Config.TIME_FORMAT = "HH:mm";
        Config.DATE_FORMAT = "DD/MM/YYYY";
        Config.DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
        Config.MINUTE_INTERVALS = 5;
        Config.DATE_LOCALE = "en-gb";
        Config.DISABLE_BUTTONS_DURING_AJAX = false;
        Config.REDIRECT_SCROLLS_UP = true;
        Config.AUTOCOMPLETE_INPUT_DELAY = 500;
        Config.DEFAULT_MODAL_BACKDROP = "static";
        /* Possible values: Compact | Medium | Advance | Full
        To customise modes, change '/Scripts/Lib/ckeditor_config.js' file */
        Config.DEFAULT_HTML_EDITOR_MODE = "Medium";
        Config.CK_EDITOR_BASE_PATH = '/lib/ckeditor/';
        return Config;
    }());
    exports.default = Config;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7UUFtQkEsQ0FBQztRQWpCRyx5REFBeUQ7UUFDbEQsa0JBQVcsR0FBVyxPQUFPLENBQUM7UUFDOUIsa0JBQVcsR0FBVyxZQUFZLENBQUM7UUFDbkMsdUJBQWdCLEdBQVcsa0JBQWtCLENBQUM7UUFDOUMsdUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLGtCQUFXLEdBQVcsT0FBTyxDQUFDO1FBRTlCLGtDQUEyQixHQUFZLEtBQUssQ0FBQztRQUM3QywwQkFBbUIsR0FBWSxJQUFJLENBQUM7UUFDcEMsK0JBQXdCLEdBQVcsR0FBRyxDQUFDO1FBQ3ZDLDZCQUFzQixHQUFHLFFBQVEsQ0FBQztRQUV6Qzs0RUFDb0U7UUFDN0QsK0JBQXdCLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLDBCQUFtQixHQUFHLGdCQUFnQixDQUFDO1FBRWxELGFBQUM7S0FBQSxBQW5CRCxJQW1CQztzQkFuQm9CLE1BQU0ifQ==