import Form from "olive/components/form"
import Url from 'olive/components/url'
import FormAction from 'olive/mvc/formAction'

export default class AutoComplete {
    private static customOptions: RunningCoder.Typeahead.Options;

    input: JQuery;
    awaitingAutocompleteResponses: number = 0;
    valueField: JQuery;

    public static setOptions(options: RunningCoder.Typeahead.Options) {
        AutoComplete.customOptions = options;
    }

    public static enable(selector: JQuery) {
        selector.each((i, e) => new AutoComplete($(e)).enable());
    }

    constructor(targetInput: JQuery) {
        this.input = targetInput;
    }

    enable() {

        if (this.input.is("[data-typeahead-enabled=true]")) return;
        else this.input.attr("data-typeahead-enabled", "true");

        if (this.input.is("[data-change-action]"))
            FormAction.enableInvokeWithAjax(this.input, "typeahead:select", "data-change-action");

        this.input.wrap("<div class='typeahead__container'></div>");

        this.valueField = $("[name='" + this.input.attr("name").slice(0, -5) + "']");

        let url = this.input.attr("autocomplete-source") || '';
        url = Url.effectiveUrlProvider(url, this.input);

        var postData: any = this.toObject(Form.getPostData(this.input));

        postData[this.input.attr("name")] = "{{query}}";

        let clientSideSearch = this.input.attr("clientside") || false;

        let callback: RunningCoder.Typeahead.Callback = {
            onClick: (node, a, item, event) => {
                // The following line is a compile error.
                // $("[name='" + node.attr("name").slice(0, -5) + "']").val(event.Value);
            },
            onClickAfter: (node, a, item, event) => {
                this.itemSelected(item);
                this.input.trigger("typeahead:select", { event, item })
            },
            onPopulateSource: (node, data) => {
                let text = this.input.val();
                let index = (<any>data).findIndex(x => x.Text.trim().toLowerCase() === text.toLowerCase().trim());
                if (index >= 0)
                    this.valueField.val(data[index].Value);

                return data;
            }
        };

        if (this.input.data("strict") === true) {
            callback = $.extend(callback, {
                onHideLayout: () => {
                    if (this.valueField.val() === "")
                        this.input.val("");
                }
            });
        }

        let defaultOptions: RunningCoder.Typeahead.Options = {
            minLength: 0,
            dynamic: !clientSideSearch,
            searchOnFocus: true,
            debug: false,
            delay: 500,
            backdrop: false,
            correlativeTemplate: true,
            emptyTemplate: "<div class='tt-suggestion'>Not found</div>"
        };

        let mandatoryOptions: RunningCoder.Typeahead.Options = {
            source: {
                values: {
                    display: "Display",
                    data: [{
                        "Display": "",
                        "Text": "",
                        "Value": ""
                    }],
                    ajax: function (query) {
                        return {
                            type: "POST",
                            url: url,
                            data: postData,
                            xhrFields: { withCredentials: true }
                        };
                    }
                }
            },
            callback: callback
        };

        this.input
            .wrap("<span class='typehead-chevron-down'></span>")
            .before('<i class="fas fa-chevron-down"></i>')
            .data("selected-text", "")
            .on('input', () => this.clearValue())
            .typeahead($.extend(defaultOptions, AutoComplete.customOptions, mandatoryOptions));
    }

    clearValue() {
        if (this.input.val() === "") this.valueField.val("");
        if (this.input.val() !== this.input.data("selected-text"))
            this.valueField.val("");
    }

    itemSelected(item: any) {

        if (item) {
            var txt = (item.Text == null || item.Text == undefined || item.Text.trim() == "") ? item.Display : item.Text;
            if (txt) txt = $("<div/>").html(txt).text();
            this.valueField.val(item.Value);
            this.input.data("selected-text", txt);
            this.input.val(txt);
        } else {
            console.log("Clearing text, item is undefined");
            this.input.data("selected-text", "");
        }
        // This will invoke RunOnLoad M# method as typeahead does not fire textbox change event when it sets its value from drop down
        this.input.trigger("change");
    }

    // Convert current form array to simple plain object
    toObject(arr: JQuerySerializeArrayElement[]) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[arr[i].name] = arr[i].value;
        return rv;
    }
}
