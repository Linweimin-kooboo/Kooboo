Vue.prototype.Kooboo = Kooboo;

// kb-tooltip
(function() {
  Vue.directive("kb-tooltip", {});
})();

//#region <kb-upload>
$(function() {
  Vue.directive("kb-upload", {
    bind: function(element, binding) {
      var config = binding.value;
      config.allowMultiple
        ? $(element).attr("multiple", true)
        : $(element).removeAttr("multiple");

      if (config.acceptTypes && config.acceptTypes.length) {
        $(element).attr("accept", config.acceptTypes.join(","));
      }

      $(element).change(function() {
        var files = this.files,
          len = files.length,
          acceptableFilesLength = 0;

        var availableFiles = [];

        if (len) {
          var data = new FormData();

          var errors = {
            size: [],
            type: [],
            suffix: []
          };

          _.forEach(files, function(file, idx) {
            var fileName = file.name;

            if (!config.acceptSuffix || !config.acceptSuffix.length) {
              if (!config.acceptTypes || !config.acceptTypes.length) {
                alert("Upload failed: please init the acceptType first.");
              } else {
                if (
                  config.acceptTypes.indexOf(file.type) > -1 ||
                  config.acceptTypes.indexOf("*/*") > -1
                ) {
                  if (file.size) {
                    data.append("file_" + idx, file);
                    availableFiles.push(file);
                    acceptableFilesLength++;
                  } else {
                    errors.size.push(file.name);
                  }
                } else {
                  errors.type.push(file.name);
                }
              }
            } else {
              if (fileName.indexOf(".") > -1) {
                var suffix = fileName
                  .split(".")
                  .reverse()[0]
                  .toLowerCase();

                if (config.acceptSuffix.indexOf(suffix) > -1) {
                  if (file.size) {
                    data.append("file_" + idx, file);
                    availableFiles.push(file);
                    acceptableFilesLength++;
                  } else {
                    errors.size.push(file.name);
                  }
                } else {
                  errors.suffix.push(file.name);
                }
              }
            }
          });

          config.callback(data, availableFiles);
          resetValue(element);

          var errorString = getErrorString();
          errorString && alert(errorString);

          function getErrorString() {
            var string = "";
            if (errors.size.length) {
              string +=
                Kooboo.text.common.File +
                " " +
                errors.size.join(", ") +
                " " +
                Kooboo.text.alert.fileUpload.emptyFile +
                "\n";
            }
            if (errors.type.length) {
              string +=
                Kooboo.text.common.File +
                " " +
                errors.type.join(", ") +
                " " +
                Kooboo.text.alert.fileUpload.invalidSuffix +
                "\n";
            }
            if (errors.suffix.length) {
              string +=
                Kooboo.text.common.File +
                " " +
                errors.suffix.join(", ") +
                " " +
                Kooboo.text.alert.fileUpload.invalidType +
                "\n";
            }
            return string;
          }
        }
      });

      function resetValue(el) {
        $(el)
          .wrap("<form>")
          .parent("form")
          .trigger("reset");
        $(el).unwrap();
      }
    }
  });
});
//#endregion </kb-upload>
