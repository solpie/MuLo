/**
 * Created by toramisu on 2015/4/21.
 */

$(function ($) {
    $window = $(window);
    $document = $(document);
    apiPage = '/page';
    pageIdx = 1;
    function onScroll(e) {
        // Only check when we're not still waiting for data.
        if (!isLoading) {
            // Check if we're within 100 pixels of the bottom edge of the broser window.
            var closeToBottom = ($window.scrollTop() + $window.height() > $document.height() - 100);
            if (closeToBottom) {
                // Only allow requests every second
                var currentTime = new Date().getTime();
                if (lastRequestTimestamp < currentTime - 1000) {
                    lastRequestTimestamp = currentTime;
                    loadData();
                }
            }
        }
    }

    function loadData() {
        isLoading = true;
        $.ajax({
//                type: 'POST',
            url: apiPage,
//                dataType: 'jsonp', // 跨域 Set to jsonp if you use a server on a different domain and change it's setting accordingly
            data: {idx: pageIdx}, // Page parameter to make sure we load new data
//                complete: onLoadData
            success: onLoadData
        });
        console.log('ajax')
    }
     function onLoadData(response) {
//            if (response.status == 200) {
        isLoading = false;
        // Increment page index for future calls.
        pageIdx++;
        var template = $('#pin-tpl').html();
        var $newImages = Mustache.render(template, {image: response});
        // Disable requests if we reached the end
        if (response.message == 'No more pictures') {
            $document.off('scroll', onScroll);
        }
        // Apply layout.
        applyLayout($newImages);
//            }
    }

    // Capture scroll event.
    $document.on('scroll', onScroll);
    // Load first data from the API.
    loadData();
})