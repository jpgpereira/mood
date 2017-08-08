step = 0;
colorIndices = [0, 1, 2, 3];
gradientSpeed = 0.01;
canVote = true;
currentMood = '';
colors = {
  colorsNeutral: [[60, 60, 60], [29, 29, 29], [115, 115, 115], [40, 40, 40]],
  colorsJoyful: [[244, 214, 49], [253, 240, 170], [224, 201, 76], [236, 200, 0]],
  colorsPowerful: [[251, 196, 12], [239, 129, 21], [206, 66, 23], [240, 77, 6]],
  colorsPeaceful: [[109, 183, 86], [207, 226, 130], [241, 245, 131], [139, 187, 95]],
  colorsScared: [[7, 48, 85], [2, 33, 57], [9, 27, 52], [33, 53, 85]],
  colorsSad: [[24, 9, 34], [55, 28, 74], [38, 16, 53], [59, 28, 79]],
  colorsMad: [[255, 0, 0], [148, 2, 2], [183, 0, 0], [237, 70, 19]],
}
downTimer = null;

$(document).ready(() => {
  colorSelected = colors['colorsNeutral'];
  setInterval(updateGradient1, 20);
  setInterval(updateGradient2, 20);
  $(".buttons div").ripple({
    scaleMode: false,
    maxDiameter: "100%"
  });
  Meteor.call(
    'mood.current',
    (err, res) => {
      if (!err) {
        $('.buttons div').removeClass('selected');
        // $(`#${res.id}`).addClass('selected');
        currentMood = res.id;
        colorSelected = colors[`colors${res.name}`];
        $('#title span').html(res.name);
      }
    }
  );
  $('.buttons div').on('mousedown touchstart', (e) => {
    if (canVote) {
      clearTimeout(downTimer);
      downTimer = setTimeout(() => {
        canVote = false;
        $.ripple.destroy();
        const mood = $(e.currentTarget)[0].id;
        Meteor.call(
          'votes.add',
          {
            mood,
          },
          (err) => {
            if (!err) {
              const moodName = mood.charAt(0).toUpperCase() + mood.slice(1);
              $('#title_vote span').html(mood);
              $('#title').fadeOut();
              $('#subtitle').fadeOut();
              $('#title_vote').fadeIn();
              $('.buttons div').removeClass('selected');
              $(`#${mood}`).addClass('selected');
              $(`#vote${moodName}`).fadeIn('slow');
              setTimeout(
                () => {
                  Meteor.call(
                    'mood.current',
                    (err, res) => {
                      if (!err) {
                        colorSelected = colors[`colors${res.name}`];
                        $('#title span').html(res.name);
                        $('#title_vote').fadeOut();
                        $('#title').fadeIn();
                        $('#subtitle').fadeIn();
                        $('.buttons div').removeClass('selected');
                        // $(`#${res.id}`).addClass('selected');
                        $(`#vote${moodName}`).fadeOut('slow');
                        $(".buttons div").ripple({
                          scaleMode: false,
                          maxDiameter: "100%"
                        });
                        canVote = true;
                      }
                    }
                  );
                }, 7000
              );
            }
          },
        );
      }, 1000);
    }
  }).on('touchend mouseup', () => {
    clearTimeout(downTimer);
  });

  $('#logo').on('click', () => {
    $('#layer').fadeIn();
  });
  $('.about').on('click', () => {
    $('#layer').fadeIn();
  });
  $('#closeOverlay').on('click', () => {
    $('#layer').fadeOut();
  });
  $('.linkClose').on('click', () => {
    $('#layer').fadeOut();
  });
});

updateGradient1 = () => {
  var c0_0 = colorSelected[colorIndices[0]];
  var c0_1 = colorSelected[colorIndices[1]];
  var c1_0 = colorSelected[colorIndices[2]];
  var c1_1 = colorSelected[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

  $('#gradient1').css({background: "-webkit-radial-gradient(80% 10%, circle, "+color1+", transparent), -webkit-radial-gradient(80% 50%, circle, "+color2+", transparent)"});

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colorSelected.length - 1))) % colorSelected.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colorSelected.length - 1))) % colorSelected.length;
  }
};

updateGradient2 = () => {
  var c0_0 = colorSelected[colorIndices[0]];
  var c0_1 = colorSelected[colorIndices[1]];
  var c1_0 = colorSelected[colorIndices[2]];
  var c1_1 = colorSelected[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

  $('#gradient2').css({background: "-webkit-radial-gradient(10% 80%, circle, "+color2+", transparent), -webkit-radial-gradient(10% 90%, circle, "+color1+", transparent)"});

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    // pick two new target color indices
    // do not pick the same as the current one
    colorIndices[1] = (colorIndices[1] + Math.floor( 1 + Math.random() * (colorSelected.length - 1))) % colorSelected.length;
    colorIndices[3] = (colorIndices[3] + Math.floor( 1 + Math.random() * (colorSelected.length - 1))) % colorSelected.length;
  }
};
