/*
Created by Freshek on 31.10.2017
*/

function saveOptions(e) {
  e.preventDefault();
  var elements = {
    headerColor:        $("#headerColor").val(),
    headerOpacity:      $("#headerOpacity").val(),
    windowColor:        $("#windowColor").val(),
    windowOpacity:      $("#windowOpacity").val(),
    timerTick:          $("#timerTick").val(),
    speedFormat:        $('input[name="speedFormat"]:checked').val(),
    windowsToTabs:      $("#windowsToTabs").prop('checked'),
    venomHp:            $("#venomHp").val(),
    cyborgHp:           $("#cyborgHp").val(),
    diminisherShd:      $("#diminisherShd").val(),

  };

  chrome.storage.local.set(elements);
}

function restore() {
	$('[data-resource]').each(function() {
		  var el = $(this);
		  var resourceName = el.data('resource');
		  var resourceText = chrome.i18n.getMessage(resourceName);
		  el.text(resourceText);
		});
	
  var items = ["headerColor", "headerOpacity", "windowColor", "windowOpacity", "timerTick", "windowsToTabs",
                "enableRefresh", "refreshToReconnect", "refreshTime", 
                "speedFormat","venomHp", "cyborgHp", "diminisherShd"];

  var onGet = items => {

    if (items.headerColor)
      $("#headerColor").val(items.headerColor);
    if (items.headerOpacity)
      $("#headerOpacity").val(items.headerOpacity);
    if (items.windowColor)
      $("#windowColor").val(items.windowColor);
    if (items.windowOpacity)
      $("#windowOpacity").val(items.windowOpacity);
    if (items.timerTick)
      $("#timerTick").val(items.timerTick);
    if (items.enableRefresh)
      $("#enableRefresh").prop('checked', true);
    if(items.refreshToReconnect)
      $("#refreshToReconnect").prop('checked', true);
    if (items.refreshTime)
      $("#refreshTime").val(items.refreshTime);

    if (items.speedFormat) {
      let sel = `#speedFormat_${items.speedFormat}`;
      $(sel).prop('checked', true);
    }
    if (items.windowsToTabs)
      $("#windowsToTabs").prop('checked', true);
    
    if (items.venomHp)
      $("#venomHp").val(items.venomHp);
    if (items.cyborgHp)
      $("#cyborgHp").val(items.cyborgHp);
    if (items.diminisherShd)
      $("#diminisherShd").val(items.diminisherShd);
  };

  chrome.storage.local.get(items, onGet);
}

$('.clearSettings').on("click", chrome.storage.sync.clear());
$("form").on("submit", saveOptions);
$(document).ready(restore);