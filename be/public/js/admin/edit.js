  const initEditor = function() {
      var E = window.wangEditor;
      var editor = new E('#editor');
      return editor;
  }
  const isReviewCode = function(editor) {
      var $text = $('#text')
      editor.customConfig.onchange = function(html) {
          // 监控变化，同步更新到 textarea
          $text.val(html)
      }
      editor.create()
          // 初始化 textarea 的值
      $text.val(editor.txt.html())
      return $text;
  }
  const isbaseSaveImg = function(editor) {
      editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      return;
  }
  const ajax = function(config) {
      var form = infoArticle();
      var success = config.success || function() {};
      var error = config.error || function() {};
      var sendContent = $.ajax({
          method: config.method || null,
          url: config.url || null,
          data: form,
          async: config.async || null,
          dataType: config.dataType || null,
          success: success || null,
          error: error || null,
      })
      log('sendContent:', sendContent)
      return sendContent;
  }
  const infoArticle = function() {
      var form = {}
          // 需要 传递的数据
      form.title = $('#blog_title').val()
      form.author = $('#blog_autor').val()
      form.catgory = $('#blog_catgory').val()
      form.date = new Date().getTime()
      form.blogContent = $('#text').val()
      return form;
  }
  const claerContent = function() {
      setTimeout(function() {
          alert('发布成功')
          $('form').reset();
      }, 1000)

  }
  const bindEventsOfBtn = function(config) {
      var strWords = `您编辑好了吗(●'◡'●)？`;
      $('#commit_content').click(function() {
          if (confirm(strWords)) {
              // ajax send data
              var response = ajax(config);
              response.status == 200 ? claerContent() : log('失败')
          } else {
              log('取消了发表操作')
          }
      })
  }



  const __mainEdit = function() {
      if (initBodyData()) {
          var config = {
              async: false,
              method: 'post',
              url: '/api/blogCommit',
              dataType: 'html',
              contentType: "application/json"
          }

          var editor = initEditor()
          isbaseSaveImg(editor);
          isReviewCode(editor);
          bindEventsOfBtn(config);
      }

  }
  __mainEdit()