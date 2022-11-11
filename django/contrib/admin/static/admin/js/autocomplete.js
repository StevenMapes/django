'use strict';
{
    const $ = django.jQuery;

    $.fn.djangoAdminSelect2 = function() {
        $.each(this, function(i, element) {
            $(element).select2({
                ajax: {
                    data: (params) => {
                        let extra = {};
                            if ($element.data('callback-func') && typeof window[$element.data('callback-func')] === "function") {
                                extra = window[$element.data('callback-func')]();
                            }
                        return Object.assign(
                            {
                                term: params.term,
                                page: params.page,
                                app_label: $element.data('app-label'),
                                model_name: $element.data('model-name'),
                                field_name: $element.data('field-name'),
                            },
                            extra
                        );
                    }
                }
            });
        });
        return this;
    };

    $(function() {
        // Initialize all autocomplete widgets except the one in the template
        // form used when a new formset is added.
        $('.admin-autocomplete').not('[name*=__prefix__]').djangoAdminSelect2();
    });

    document.addEventListener('formset:added', (event) => {
        $(event.target).find('.admin-autocomplete').djangoAdminSelect2();
    });
}
