//*************************
// play music. can stop but cannot pause.
// after stop, click on play, cannot play again.
//need to change the name and picture cover of the song
// change the visualizer.js to show not the boxes, but svg bars.
//*************************************************************

var context;
var source, sourceJs;
var analyser,analyser2;
var buffer;
var url = "http://www.lunyang.comoj.com/jietuo.ogg";
var array = new Array();
var array2 = new Array();
var boost = 0;
var boost2 = 0;

var interval = window.setInterval(function() {
	if($('#loading_dots').text().length < 3) {
		$('#loading_dots').text($('#loading_dots').text() + '.');
	}
	else {
		$('#loading_dots').text('');
	}
}, 500);

try {
	if(typeof webkitAudioContext === 'function') {
		context = new webkitAudioContext();
	}
	else {
		context = new AudioContext();
	}
}
catch(e) {
	$('#info').text('Web Audio API is not supported in this browser');
}

var fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', function(e) {  
  	var reader = new FileReader();
	reader.onload = function(e) {
		context.decodeAudioData(this.result,function(buffer) {
				
				if(!buffer) {
					$('#info').text('Error decoding file data');
					return;
				}
				//set up a javascript node
				sourceJs = context.createJavaScriptNode(2048);
				sourceJs.buffer = buffer;
				//connect javascriptnode to destination, or it will not be called.
				sourceJs.connect(context.destination);
				
				analyser = context.createAnalyser();
				analyser.smoothingTimeConstant = 0.6;
				analyser.fftSize = 512;
				
				source = context.createBufferSource();
				source.buffer = buffer;
				source.loop = true;
				
				source.connect(analyser);
				analyser.connect(sourceJs);
				source.connect(context.destination);
				
				//boost, boost2 is global variable, so we can use them in the visualizer.js

				sourceJs.onaudioprocess = function(e) {
					array = new Uint8Array(analyser.frequencyBinCount);
					analyser.getByteFrequencyData(array);


					boost = 0;

					for (var i = 0; i < array.length; i++) {
			            boost += array[i];
			        }
			        boost = boost / array.length;

				};
				
				$('#info')
					.fadeOut('normal', function() {
						$(this).html('<div id="artist"><a class="name" href="http://www.looperman.com/users/profile/345547" target="_blank">Jietuo</a><br /><a class="song" href="http://www.looperman.com/tracks/detail/70506" target="_blank">Huimei ZHANG</a><br /></div><div><img src="data/cufool.jpg" width="58" height="58" /></div>');
					})
					.fadeIn();
				
				clearInterval(interval);

				// when loading is ready:
				alert("start to play!");
				// popup
				$('body').append($('<div onclick="play();" id="play" style="width: ' + $(window).width() + 'px; height: ' + $(window).height() + 'px;"><div id="play_link"></div></div>'));
				$('#play_link').css('top', ($(window).height() / 2 - $('#play_link').height() / 2) + 'px');
				$('#play_link').css('left', ($(window).width() / 2 - $('#play_link').width() / 2) + 'px');
				$('#play').fadeIn();

				var buttons = document.querySelectorAll('button');
		        buttons[0].disabled = false;
		        buttons[1].disabled = false;

			},
			
			function(error) {
				$('#info').text('Decoding error:' + error);
			}
		);
	};

    reader.readAsArrayBuffer(this.files[0]);
}, false);


function displayTime(time) {
	if(time < 60) {
		return '0:' + (time < 10 ? '0' + time : time);
	}
	else {
		var minutes = Math.floor(time / 60);
		time -= minutes * 60;
		return minutes + ':' + (time < 10 ? '0' + time : time);
	}
}

function play() {
	$('#play').fadeOut('normal', function() {
		$(this).remove();
	});
	source.noteOn(0);

}

function stopSound() 
    {
      if (source) {
        source.noteOff(0);
      }
    }

function playSound() 
    {
      // source is global so we can call .noteOff() later.
			$('body').append($('<div onclick="play();" id="play" style="width: ' + $(window).width() + 'px; height: ' + $(window).height() + 'px;"><div id="play_link"></div></div>'));
			$('#play_link').css('top', ($(window).height() / 2 - $('#play_link').height() / 2) + 'px');
			$('#play_link').css('left', ($(window).width() / 2 - $('#play_link').width() / 2) + 'px');
			$('#play').fadeIn();

    }

$(window).resize(function() {
	if($('#play').length === 1) {
		$('#play').width($(window).width());
		$('#play').height($(window).height());
		
		if($('#play_link').length === 1) {
			$('#play_link').css('top', ($(window).height() / 2 - $('#play_link').height() / 2) + 'px');
			$('#play_link').css('left', ($(window).width() / 2 - $('#play_link').width() / 2) + 'px');
		}
	}
});




