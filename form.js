'use strict';

const formHandling = (function () {
  return {
    getFormData: function () {
      return (form, otherParams, returnType = 'json') => {
        if (form) {
          let inputElements = form.getElementsByTagName('input');
          let selectElement = form.getElementsByTagName('select');
          let textareaElements = form.getElementsByTagName('textarea');

          let allFormElements = [...inputElements, ...selectElement, ...textareaElements];
          let jsonData = {};

          allFormElements.map(field => {
            let value = '';
            let key = '';
            if (field.type == 'checkbox') {
              value = Number(field.checked);
              key = field.name;
            } else if (field.type == 'radio') {
              if (field.checked) {
                value = field.value;
                key = field.name;
              }
            } else {
              value = field.value;
              key = field.name;
            }

            if (key) {
              jsonData[key] = value;
            }
          });

          jsonData = {
            ...jsonData,
            ...otherParams
          };

          if (returnType == 'formdata') {
            let form_data = new FormData();

            for (var key in jsonData) {
              form_data.append(key, jsonData[key]);
            }

            return form_data;
          } else {
            return jsonData;
          }
        }
      }
    }
  }
})();

export const $getFormData = formHandling.getFormData();
