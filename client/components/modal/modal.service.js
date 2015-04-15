'use strict';

angular.module('ben33App')
  .factory('Modal', ['$rootScope', '$modal', '$q', function ($rootScope, $modal, $q) {

    /**
     * 確認用モーダルを表示する。
     *
     * @param  {String} templateUrl - 表示するHTML
     * @param  {Object} scope - モーダルのscopeに渡す値
     * @param  {String} modalClass - (optional) モーダルに追加するクラス（あれば）
     * @return {Object} - $modal.open()が返すインスタンス
     */
    function openConfirmModal(templateUrl, scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: templateUrl,
        windowClass: modalClass,
        scope: modalScope
      });
    }

    /**
     * 処理中のモーダルを表示する。
     * このモーダルは呼び出し側で明示的に閉じる必要がある。
     * @param {Object} scope - モーダルのscopeに渡す値
     * @param {String} modalClass - (optional) モーダルに追加するクラス（あれば）
     * @return {Object} - $modal.open()が返すインスタンス
     *
     */
    function openProcessModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/process.html',
        windowClass: modalClass,
        scope: modalScope,
        keyboard: false,
        backdrop: 'static'
      });
    }

    // Public API here
    return {
      /* 処理中モーダル */
      process: function () {
        var processingModal = openProcessModal({
          modal: {
            title: '処理中'
          }
        }, 'modal-material-pink');
        
        return {
          close: function () {
            processingModal.close();
          }
        };
      },
      confirm: function () {
        var confirmModal = openConfirmModal(
          'components/modal/modal.html',
          {
            modal: {
              dismissable: true,
              title: title,
              message: message,
              buttons: [{
                classes: 'btn-material-pink',
                text: 'OK',
                click: function (e) {
                  confirmModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function (e) {
                  confirmModal.dismiss(e);
                }
              }]
            }
          },
          'modal-material-pink');
                         
      },

      confirm2: {
        /**
         * 確認モーダルを表示し、処理を実行する
         * @param {Promise} proc - 実行する処理
         * @param {Function} postProc - 処理結果表示後に実行する処理
         * @return {Function} - 
         */ 
        askToProc: function (proc, postProc) {
          proc = proc || angular.noop;
          postProc = postProc || angular.noop;

          console.log('proc');
          console.log(proc);

          return function () {
            var args = Array.prototype.slice.call(arguments),
                defer = $q.defer(),
                title = args.shift(),
                message = args.shift(),
                confirmModal,
                processingModal,
                postResult;

            confirmModal = openConfirmModal(
              'components/modal/modal.html',
              {
                modal: {
                  dismissable: true,
                  title: title,
                  message: message,
                  buttons: [{
                    classes: 'btn-material-pink',
                    text: 'OK',
                    click: function (e) {
                      confirmModal.close(e);
                    }
                  }, {
                    classes: 'btn-default',
                    text: 'Cancel',
                    click: function (e) {
                      confirmModal.dismiss(e);
                    }
                  }]
                }
              },
              'modal-material-pink');

            confirmModal.result.then(function (event) {
              processingModal = openProcessModal({
                modal: {
                  dismissable: true,
                  title: '処理中'
                }
              }, 'modal-material-pink');

              processingModal.result.then(function (event) {
                confirmModal = openConfirmModal(
                  'components/modal/modal.html',
                  {
                    modal: {
                      dismissable: true,
                      title: '処理完了',
                      message: postResult.data.message,
                      buttons: [{
                        classes: 'btn-material-pink',
                        text: 'OK',
                        click: function (e) {
                          confirmModal.close(e);
                        }
                      }]
                    }
                  },
                  'modal-material-pink');
                confirmModal.result.then(function (event) {
                  postProc(postResult.data.result);
                });
              });

              proc()
                .then(function (result) {
                  postResult = result;
                })
                .finally(function (result) {
                  processingModal.close();
                });
            });
          };
        }
      }
    };
  }]);
