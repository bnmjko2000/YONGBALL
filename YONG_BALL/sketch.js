/* ===
Available parts are:
0 nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
=== */
let step = 1;
let stage = "A";
let gaugeMax;
let gaugeC;
let gaugeP;
let ballC = 0;
let ballC_cal = 0;
let ballP = 0;
let ballP_cal = 0;
let ballP0_boolean = true;
let ballSize;
let selects = [];
let selects_aadd = [];
let selects_na = [];
let selects_nd = [];
let selects_ndaa = [];
let selects_ndaaaa = [];
let selects_nc = [];
let selects_ncaa = [];
let c_select;
let p_select;
let timer;
let inter = 60;
//imgages
let ballImage = [];
let winImage;
let loseImage;
let drawImage;
let piccoloImage_defense;
let piccoloImage_charge;
let piccoloImage_attack;
let piccoloImage_;
let titleImage;
let skillImage_c;
let skillImage_d;
let skillImage_a;
let skillImage_miss;
let normalHair;
let chargedHair;
let eyes_normal_image;
let eyes_charged_image;
let silhouette_basic;
let silhouette_av1;
let silhouette_av2;
let silhouette_c;
let silhouette_d;
let tooCloseMessage;
let backgroundImage_game;
let hpImage;
let titledisplayGif;
let step_end;
let gaugeBarImage;
let howToPlayImage_0;
let howToPlayImage_1;
let howToPlayImage_2;
// let pressAnyKeyImage;
// let startImage;
let restart_display;
let attackImages = [];
let attackGifCount = 0;
let attackImagesCount = -1;
// let userattackImages = [];
// let userattackGifCount = 0;
// let userattackImagesCount = -1;
// c = charge, d = defend, a = attack
// ml5 poseNet and neural network
let video;
let poseNet;
let brain;
let poseLabel = "Null";
let detectedPose;
let detectedArray = [];
let countselect_c = 0;
let countselect_d = 0;
let countselect_a = 0;
let countselect_null = 0;
let finalselect = "";
let readytoStart = false;

let sound_Victory;
let sound_Victory_Count = 0;
let sound_Defeat;
let sound_Defeat_Count = 0;
let sound_Game;
let sound_Game_Count = 0;

let sound_intro;

let comTextImage;
// let readyTextImage;
let youTextImage;
let vsTextImage;

// let intro_voice;
let beat_sound;
let c_voice;
let d_voice;
let a_voice;
let c_voice_Count;
let d_voice_Count;
let a_voice_Count;
let win_voices = [];
let lose_voices = [];
let win_voices_Count;
let lose_voices_Count;
let first_game_boolean = true;
let tutorial;
let tt_clear = false;
let tt_timer = 10;
let tt_background;
let tt_title;
let tt_text;
let explanation = 0;
let tt_stage_3 = 1;
let tt_stage_4 = 1;
let tt_stage_5 = 1;
let successText;
let pressAnyKeyToRestart;
// let selectImage;
let failImage;
let poseImage;
let freezeImage;
let sV = 0.3;
let tt_display_3;
let tt_display_4;
let tt_display_5;
////////QAQ
let finalCount = 30;
///////
function preload() {
  for (let i = 0; i < 7; i++) {
    let k = i + 1;
    ballImage[i] = loadImage("assets/balls/" + k + ".png");
  }
  winImage = loadImage("assets/win/win.png");
  loseImage = loadImage("assets/lose/lose.png");
  drawImage = loadImage("assets/draw/draw.png");
  piccoloImage = loadImage("assets/piccolo/IMG_0541.PNG");
  piccoloImage_charge = loadImage("assets/piccolo/Piccolo_charge.PNG");
  piccoloImage_defense = loadImage("assets/piccolo/Piccolo_defense.PNG");
  piccoloImage_attack = loadImage("assets/piccolo/Piccolo_attack.PNG");
  titleImage = loadImage("assets/Title/Title.PNG");
  skillImage_c = loadImage("assets/word/IMG_0546.PNG");
  skillImage_d = loadImage("assets/word/IMG_0547.PNG");
  skillImage_a = loadImage("assets/word/IMG_0548.PNG");
  skillImage_miss = loadImage("assets/word/Miss.PNG");

  normalHair = loadImage("assets/hair/User_hair.PNG");
  chargedHair = loadImage("assets/hair/IMG_0537.PNG");

  silhouette_basic = loadImage("assets/silhouette/basic_orange.png");
  silhouette_av1 = loadImage("assets/silhouette/a_v_1.png");
  silhouette_av2 = loadImage("assets/silhouette/a_v_1.png");
  silhouette_c = loadImage("assets/silhouette/c.png");
  silhouette_d = loadImage("assets/silhouette/d.png");
  tooCloseMessage = loadImage("assets/text/step back.png");
  backgroundImage_game = loadImage("assets/background/IMG_0553.PNG");
  hpImage = loadImage("assets/hp/hp.png");
  gaugeBarImage = loadImage("assets/gaugeBar/Bar.PNG");

  for (let i = 0; i < 11; i++) {
    let k = i + 1;
    attackImages[i] = loadImage("assets/animation/attack/A" + k + ".PNG");
  }
  // for (let i = 0; i < 10; i++) {
  //   let k = i + 1;
  //   userattackImages[i] = loadImage("assets/animation/user_attack/UA" + k + ".PNG");
  // }
  titledisplayGif = createImg("assets/Title/title_display.gif");
  restart_display = loadImage("assets/Title/restart_display.png");

  howToPlayImage_0 = loadImage("assets/background/tutorial_stage0.png");
  howToPlayImage_1 = loadImage("assets/background/tutorial_stage1.png");
  howToPlayImage_2 = loadImage("assets/background/tutorial_stage2.png");
  howToPlayImage_3 = loadImage("assets/background/tutorial_stage3.png");

  comTextImage = loadImage("assets/text/Com.PNG");
  // readyTextImage = loadImage("assets/text/Ready.PNG");
  youTextImage = loadImage("assets/text/You.PNG");
  vsTextImage = loadImage("assets/text/Vs.PNG");

  sound_Victory = loadSound("assets/sound/Monplaisir_-_08_-_Victory.mp3");
  sound_Defeat = loadSound("assets/sound/Monplaisir_-_09_-_Defeat.mp3");
  sound_Game = loadSound("assets/sound/RoccoW_-_Hello_Chiptune_Cover.mp3");
  sound_intro = loadSound("assets/sound/recorder.mp3");
  // intro_voice = loadSound("assets/sound/recordings/intro.mp3");
  beat_sound = loadSound("assets/sound/recordings/beat.mp3");
  tt_sound = loadSound("assets/sound/Fried_Moura_-_06_-_Your_Mother_In_Chiptune.mp3")
  c_voice = loadSound("assets/sound/recordings/c_sound.mp3");
  d_voice = loadSound("assets/sound/recordings/d_sound.mp3");
  a_voice = loadSound("assets/sound/recordings/a_sound.mp3");
  win_voices[0] = loadSound("assets/sound/recordings/win1.mp3");
  win_voices[1] = loadSound("assets/sound/recordings/win2.mp3");
  win_voices[2] = loadSound("assets/sound/recordings/win3.mp3");
  win_voices[3] = loadSound("assets/sound/recordings/win4.mp3");
  lose_voices[0] = loadSound("assets/sound/recordings/lose1.mp3");
  lose_voices[1] = loadSound("assets/sound/recordings/lose2.mp3");
  lose_voices[2] = loadSound("assets/sound/recordings/lose3.mp3");
  lose_voices[3] = loadSound("assets/sound/recordings/lose4.mp3");


  eyes_normal_image = loadImage("assets/eyes/Eye.PNG");
  eyes_charged_image = loadImage("assets/eyes/Eye2.PNG");

  tt_background = loadImage("assets/background/tutorial background.png");
  tt_title = loadImage ("assets/background/tutorial title.png");
  // tt_text = loadImage ("assets/background/tutorial text_try posing.png");
  tt_display_3 = loadImage("assets/background/tutorial text display(1)_try to pose like piccolo_charge.png");
  tt_display_4 = loadImage("assets/background/tutorial text display(2)_try to pose like piccolo_attack.png");
  tt_display_5 = loadImage("assets/background/tutorial text display(3)_press spacebar to defense piccolo_final.png");
  successText = loadImage ("assets/text/Success.PNG");
  pressAnyKeyToRestart = loadImage("assets/text/Press any key to restart.png");
  // selectImage = loadImage("assets/text/Select.PNG");
  failImage = loadImage("assets/text/IMG_0630.PNG");
  poseImage = loadImage("assets/text/Pose.PNG");
  freezeImage = loadImage("assets/text/Freeze.PNG");
}

function setup() {
  createCanvas(windowWidth*0.991, windowHeight*0.982);
  gaugeMax = width * 3 / 8;
  ballSize = width / 40;
  finalCount = 30;

  selects = ["c", "d", "a"];
  selects_aadd = ["c", "d", "d", "a", "a"];
  selects_na = ["c", "d"];
  selects_nd = ["c", "a"];
  selects_ndaa = ["c", "a", "a"];
  selects_ndaaaa = ["c", "a", "a", "a"];
  selects_nc = ["a", "d"];
  selects_ncaa = ["a", "a", "d"];
  sound_Victory.setVolume(sV);
  sound_Defeat.setVolume(sV);
  sound_Game.setVolume(sV);
  sound_intro.setVolume(sV);
  // intro_voice.setVolume(sV);
  beat_sound.setVolume(sV);
  tt_sound.setVolume(sV);

  for (let i = 0; i < 4; i ++) {
    win_voices[i].setVolume(1.0);
    lose_voices[i].setVolume(1.0);
  }
  c_voice.setVolume(sV);
  d_voice.setVolume(sV);
  a_voice.setVolume(sV);
  // poseNet
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  let options = {
    inputs: 34,
    outputs: 3,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'data/model.json',
    metadata: 'data/model_meta.json',
    weights: 'data/model_weights.bin',
  }
  brain.load(modelInfo, brainLoaded);
}

function draw() {
  switch (step) {
    case 1:
      start();
      if (readytoStart) {
        if (sound_intro.isPlaying() == false) {
          sound_intro.play();
        }
      }
      break;
    case 1.5:
      manual();
      break;
    case 1.7:
      manual_2();
      break;
    case 2:
      game();
      break;
    case tutorial:
      if (tt_sound.isPlaying() == false) {
        tt_sound.play();
      }
      tutorialGo();
      break;
  }
}

function videoDisplay() {
  push();
  translate(width / 2, 0);
  scale(-1, 1);
  imageMode(CORNER);
  video.size(width/2, height);
  image(video, 0, 0, width / 2, height, video.width / 7, 0, video.width * 5 / 7, video.height);
  hair();
  attackDisplay();
  pop();
  tooClose();
}

function tooClose(){
  if (detectedPose){
    let pose = detectedPose[0].pose;
    let leftEar = pose['leftEar'];
    let rightEar = pose['rightEar'];
    let distance_ear = dist(leftEar.x,0,rightEar.x,0);

    if (distance_ear > width/10){
      imageMode(CENTER);
      image(silhouette_basic, width/4, height*0.7, width/2, height*1.2);
      image(tooCloseMessage, width/4, height/2, width/2, height/12);
    }
  }
}

function start() {

    // if (sound_intro.isPlaying() == false) {
    //   sound_intro.play();
    // }

  // if (intro_voice.isPlaying() == false) {
  //   intro_voice.play();
  // }

  imageMode(CORNER);
  image(restart_display, 0, 0, width, height);


  titledisplayGif.size(width, height);
  titledisplayGif.position(0, 0);

  ballC = 0;
  ballC_cal = 0;
  ballP = 0;
  ballP_cal = 0;
  gaugeC = gaugeMax;
  gaugeP = gaugeMax;
  timer = inter;
  stage = "A";
  step_end = false;
  sound_Game_Count = 0;
  sound_Victory_Count = 0;
  sound_Defeat_Count = 0;
  sound_Draw_Count = 0;
  win_voices_Count = 0;
  lose_voices_Count = 0;
}

function manual() {
  sound_intro.stop();
  tt_sound.stop();
  // intro_voice.stop();

  imageMode(CENTER);
  image(howToPlayImage_2, width/2, height/2, width, height);
}

function manual_2() {
  finalCount -= 1;
  imageMode(CENTER);
  image(howToPlayImage_3, width/2, height/2, width, height);

  ballC = 0;
  ballC_cal = 0;
  ballP = 0;
  ballP_cal = 0;
  gaugeC = gaugeMax;
  gaugeP = gaugeMax;
  timer = inter;
  stage = "A";
  step_end = false;
  sound_Game_Count = 0;
  sound_Victory_Count = 0;
  sound_Defeat_Count = 0;
  sound_Draw_Count = 0;
  win_voices_Count = 0;
  lose_voices_Count = 0;
}

function game() {
  if (sound_Game_Count == 0) {
    sound_Game.play();
    sound_Game_Count = -1;
  }
  gamedesign();
  battle();
  if (step_end == false) {
    ballCount();
  }
}

function endW() {
  sound_Game.stop();
  first_game_boolean = false;
  if(sound_Victory_Count == 0) {
    sound_Victory.play();
    sound_Victory_Count = -1;
  }

  if(win_voices_Count == 0) {
    random(win_voices).play();
    win_voices_Count = -1;
  }

  noStroke();
  fill(120, 150);
  rectMode(CORNER);
  rect(0, 0, width, height);
  imageMode(CENTER);
  image(winImage, width / 2, height * 3 / 8, width / 2, width / 8);
  imageMode(CENTER);
  image(pressAnyKeyToRestart, width / 2, height / 2, width, height);
}

function endL() {
  sound_Game.stop();
  first_game_boolean = false;

  if(sound_Defeat_Count == 0) {
    sound_Defeat.play();
    sound_Defeat_Count = -1;
  }
  if(lose_voices_Count == 0) {
    random(lose_voices).play();
    lose_voices_Count = -1;
  }
  noStroke();
  fill(120, 150);
  rectMode(CORNER);
  rect(0, 0, width, height);
  imageMode(CENTER);
  image(loseImage, width / 2, height * 3 / 8, width / 2, width / 8);
  imageMode(CENTER);
  image(pressAnyKeyToRestart, width / 2, height /2, width, height);
}

// function endD() {
//   sound_Game.stop();
//   first_game_boolean = false;
//
//   noStroke();
//   fill(120, 150);
//   rectMode(CORNER);
//   rect(0, 0, width, height);
//   imageMode(CENTER);
//   image(drawImage, width / 2, height * 3 / 8, width / 2, width / 8);
//   imageMode(CENTER);
//   image(pressAnyKeyToRestart, width / 2, height / 2, width, height);
// }

function battle() {
  // timer : 90
  switch (stage) {
    //select
    case "A":
      imageMode(CENTER);
      image(poseImage, width/2, height/2, width * 4/15, width* 2/ 15);
      p_select = "Null";
      c_select = "Null";
      timer -= 1;
      detectedArray = [];
      countselect_c = 0;
      countselect_d = 0;
      countselect_a = 0;
      countselect_null = 0;
      if (ballP == 0) {
        ballP0_boolean = true;
      } else {
        ballP0_boolean = false;
      }
      if (timer <= 0) {
        timer = inter;
        stage = "B";
      }
      break;

    case "B":
      // poseNet classifier
      if (timer == int(inter*3/4)) {
        classifyPose();
      }
      imageMode(CENTER);
      image(freezeImage, width/2, height/2, width * 4/15, width* 2/ 15);

      computerPlay();
      console.log(timer);


      attackGifCount = 0;
      c_voice_Count = 0;
      d_voice_Count = 0;
      a_voice_Count = 0;

      timer -= 1;
      if (timer == 0) {
        timer = inter;
        stage = "C";
      }
      break;

      //buffer
    case "C":

      selectDisplay();

      if (gaugeC <= 2) {
        endW();
        step_end = true;
      } else if (gaugeP <= 2) {
        endL();
        step_end = true;
      }
      // else if (gaugeC < gaugeMax / 2 && gaugeP < gaugeMax / 2 && ballC == 0 && ballP == 0 && timer > inter *4/5) {
      //   endD();
      //   step_end = true;
      // }

      if (step_end == false) {
        timer -= 1;
        if (timer == 0) {
          timer = inter;
          stage = "A";
        }
      }
      break;
  }
}

function computerPlay() {
  // gaugeC == 3/3 or 2/3
  if (gaugeC > gaugeMax / 2) {
    if (ballC == 0) {
      if (ballP == 0) {
        c_select = "c";
      } else if (ballP >= 1) {
        c_select = random(selects_na);
      }
    } else if (ballC == 1) {
      if (ballP == 0) {
        c_select = random(selects_nd);
      } else if (ballP >= 1) {
        c_select = random(selects);
      }
    } else if (ballC == 2) {
      if (ballP == 0) {
        c_select = random(selects_ndaa);
      } else if (ballP >= 1) {
        c_select = random(selects_aadd);
      }
    } else if (ballC >= 3) {
      if (ballP == 0) {
        c_select = "a";
      } else if (ballP >= 1) {
        c_select = random(selects_ncaa);
      }
    }
  }
  // gaugeC == 1/3
  else if (gaugeC <= gaugeMax / 2) {
    if (ballC == 0) {
      c_select = "c";
    } else if (ballC == 1) {
      c_select = random(selects_ndaa);
    } else if (ballC == 2) {
      c_select = random(selects_ndaaaa);
    } else if (ballC >= 3) {
      c_select = "a";
    }
  }

  if (ballP == 0 && gaugeP < gaugeMax && ballC >= 2) {
    c_select = "a";
  } else if (ballP == 0 && gaugeP < gaugeMax / 2 && ballC >= 1) {
    c_select = "a";
  }
}

function selectDisplay() {
  if (finalselect == "c") {
    imageMode(CENTER);
    image(skillImage_c, width / 4, height / 2, width * 2/ 15, width * 2/ 15);
    if (c_voice_Count == 0) {
      c_voice.play();
      c_voice_Count = -1;
    }
    ballP_cal += 1 / inter;
  } else if (finalselect == "d") {
    imageMode(CENTER);
    image(skillImage_d, width / 4, height / 2, width * 1 / 5, width * 2/ 15);
    if (d_voice_Count == 0) {
      d_voice.play();
      d_voice_Count = -1;
    }
  } else if (finalselect == "a") {
    if (ballP0_boolean) {
      finalselect = "Null"
      imageMode(CENTER);
      image(skillImage_miss, width / 4, height / 2, width * 1/5, width * 2/15);

    } else {
      imageMode(CENTER);
      image(skillImage_a, width / 4, height / 2, width * 2/15, width * 2/15);
      if (a_voice_Count == 0) {
        a_voice.play();
        a_voice_Count = -1;
      }
      ballP_cal -= 1 / inter;
    }
  } else {
    imageMode(CENTER);
    image(skillImage_miss, width / 4, height / 2, width * 1/5, width * 2/15);
  }

  if (c_select == "c") {

    imageMode(CENTER);
    image(skillImage_c, width * 3 / 4, height / 2, width * 2/15, width * 2/15);
    ballC_cal += 1 / inter;
  } else if (c_select == "d") {
    imageMode(CENTER);
    image(skillImage_d, width * 3 / 4, height / 2, width * 1/5, width * 2/15);
  } else if (c_select == "a") {
    imageMode(CENTER);
    image(skillImage_a, width * 3 / 4, height / 2, width * 2/15, width * 2/15);
    ballC_cal -= 1 / inter;
  }

  if (finalselect == "a") {
    if (c_select == "c") {
      gaugeC -= gaugeMax / inter;
    } else if (c_select == "d") {
      gaugeC -= (gaugeMax / 3) / inter;
    }
  }

  if (c_select == "a") {
    if (finalselect == "c" || finalselect == "Null") {
      gaugeP -= gaugeMax / inter;
    } else if (finalselect == "d") {
      gaugeP -= (gaugeMax / 3) / inter;
    }
  }

  ballC = nfc(ballC_cal + 0.3, 0);
  ballP = nfc(ballP_cal + 0.3, 0);
}

function hair(){
  if (detectedPose.length > 0) {
    let pose = detectedPose[0].pose;
    let leftEye = pose['leftEye'];
    let rightEye = pose['rightEye'];
    let eyesCenterX = (leftEye.x + rightEye.x) /2;
    let eyesCenterY = (leftEye.y + rightEye.y) /2;;
    let leftEar = pose['leftEar'];
    let rightEar = pose['rightEar'];
    let distance = dist(leftEar.x,leftEar.y,rightEar.x,rightEar.y);
    if (ballP0_boolean == true){
      imageMode(CENTER);
      image(normalHair, eyesCenterX, eyesCenterY+distance*0.2, distance*3, distance*3);
      image(eyes_normal_image, eyesCenterX, eyesCenterY, distance*2.5, distance*2.5);
    } else {
      imageMode(CENTER);
      image(chargedHair, eyesCenterX, eyesCenterY-distance*0.5, distance*2.8, distance*2.8);
      image(eyes_charged_image, eyesCenterX, eyesCenterY, distance*2.5, distance*2.5);
    }
  }
}

function attackDisplay(){
  if (stage == "C" && finalselect == "a" && detectedPose.length > 0) {
    let pose = detectedPose[0].pose;
    let leftWrist = pose['leftWrist'];
    let rightWrist = pose['rightWrist'];
    let wristCenterX = (leftWrist.x + rightWrist.x)/2;
    let wristCenterY = (leftWrist.y + rightWrist.y)/2;
    let distance = dist(leftWrist.x,leftWrist.y, rightWrist.x,rightWrist.y);
    for (let i = 0; i < attackImages.length; i++) {
      if (attackGifCount >= i * inter / 11 && attackGifCount <= (i + 1) * inter / 11) {
        image(attackImages[i], wristCenterX, wristCenterY, distance*3, distance*3);
      }
    }
    attackGifCount += 1;
  }
}

function gamedesign() {
  gamedesign_piccolo();
  gamedesign_baseline();
}

function gamedesign_piccolo() {
  background(200);
  imageMode(CENTER, CENTER);
  image(backgroundImage_game, width * 3 / 4, height * 1 / 2, width / 2, height);
  videoDisplay();
  if (stage == "C" || tt_stage_5 == 3 ) {
    if (c_select == "c") {
      imageMode(CENTER);
      image(piccoloImage_charge, width * 3 / 4, height / 2, height * 9 / 16, height * 3 / 4);
    } else if (c_select == "d") {
      imageMode(CENTER);
      image(piccoloImage_defense, width * 3 / 4, height / 2, height * 9 / 16, height * 3 / 4);
    } else {
      imageMode(CENTER);
      image(piccoloImage_attack, width * 3 / 4, height / 2, height * 9 / 16, height * 3 / 4);

      for (let i = 0; i < attackImages.length; i++) {
        if (attackGifCount >= i * inter / 11 && attackGifCount <= (i + 1) * inter / 11) {
          image(attackImages[i], width * 3 / 4, height* 1/ 2 + width/10, width * 2/15, width * 2/15);
        }
      }
      attackGifCount += 1;
    }
  } else {
    imageMode(CENTER);
    image(piccoloImage, width * 3 / 4, height / 2, height * 9 / 16, height * 3 / 4);
    }
  }

function gamedesign_baseline() {
  image(hpImage, width / 4 - gaugeMax / 2 - width / 40 - width/200, height / 4 - width / 20 + width / 80 - width / 30, width / 25, width / 25);
  image(hpImage, width * 3 / 4 + gaugeMax / 2 + width / 40 + width/200, height / 4 - width / 20 + width / 80 - width / 30, width / 25, width / 25);

  strokeWeight(3);
  stroke(0);
  fill(0, 255, 0);
  rectMode(CORNER);
  if (gaugeP > 0) {
    rect(width / 4 - gaugeMax / 2, height / 4 - width / 20 - width / 30, gaugeP, width / 40);
  }
  if (gaugeC > 0) {
    push();
    translate(width * 3 / 4, height / 4 - width / 20 - width / 30);

    scale(-1, 1);
    rect(-gaugeMax / 2, 0, gaugeC, width / 40);
    pop();
  }

  imageMode(CORNER);
  image(gaugeBarImage, width / 4 - width/200 - gaugeMax / 2, height / 4 - width / 20 - width / 30, gaugeMax + width/100, width / 40);
  image(gaugeBarImage, width* 3 / 4 - width/200 - gaugeMax / 2, height / 4 - width / 20 - width / 30, gaugeMax + width/100, width / 40);

  imageMode(CORNER);
  let k = width/40;
  image(youTextImage, width / 4 - gaugeMax / 2, height * 1 / 10 - k/4 - width / 30, k * 5/2 , k);
  image(comTextImage,  width * 3 / 4 + gaugeMax / 2 - k* 5/2 , height * 1 / 10 - k/4 - width / 30, k * 5/2, k);
  imageMode(CENTER);
  image(vsTextImage, width * 1 / 2, height / 4 - width / 20 + width / 80 - width / 30, width * 2/15, width *2/30);
}

function ballCount() {
  if (ballP < 8) {
    for (let i = 0; i < ballP; i++) {
      imageMode(CENTER);
      image(ballImage[i], width / 4 - gaugeMax / 2 + ballSize / 2 + (ballSize + width / 100) * i, height / 4 - width/30, ballSize, ballSize);
    }
  } else {
    for (let i = 0; i < 7; i++) {
      imageMode(CENTER);
      image(ballImage[i], width / 4 - gaugeMax / 2 + ballSize / 2 + (ballSize + width / 100) * i, height / 4 - width/30, ballSize, ballSize);
    }
  }

  if (ballC < 8) {
    for (let i = 0; i < ballC; i++) {
      imageMode(CENTER);
      image(ballImage[i], width * 3 / 4 - gaugeMax / 2 + ballSize / 2 + (ballSize + width / 100) * i, height / 4 - width/30, ballSize, ballSize);
    }
  } else {
    for (let i = 0; i < 7; i++) {
      imageMode(CENTER);
      image(ballImage[i], width * 3 / 4 - gaugeMax / 2 + ballSize / 2 + (ballSize + width / 100) * i, height / 4 - width/30, ballSize, ballSize);
    }
  }
}

function keyPressed() {
  if (step == 1) {
    if (readytoStart) {
      if (first_game_boolean == true) {
        titledisplayGif.hide();
        step = tutorial;
        explanation = 1;
      } else {
        titledisplayGif.hide();
        step = 1.5;
      }
    }
  } else if (step == 1.5) {
    step = 1.7;
  } else if (step_end) {
    step = 1;
    step_end = false;
  } else if (step == 1.7 && finalCount <= 0) {
    finalCount = 30;
    step = 2;
  }
  // if (stage == "B") {
  //   finalselect = key;
  // }
  if (explanation == 1 && tt_timer <= 0) {
    tt_timer = 10;
    explanation = 2;
  }
  if (explanation == 2 && tt_timer <= 0) {
    tt_timer = 10;
    explanation = 3;
  }
  if (key == " " && stage == "C" && finalselect == "c" || key == " " && explanation == 5 && tt_stage_5 == 3) {
    finalselect = "d";
  }
}

// ml5 posenet related functions
function brainLoaded() {
  console.log('brain loaded!');
}

function classifyPose(){
  if (detectedPose){
    let inputs = [];
    for (let i=0; i<detectedPose[0].pose.keypoints.length; i++){
      let x = detectedPose[0].pose.keypoints[i].position.x;
      let y = detectedPose[0].pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  }
}

function gotResult(error, results) {
  poseLabel = results[0].label;
  detectedArray.push(poseLabel);
  console.log(detectedArray);
  findSelection();
}

function findSelection() {
  for (let i = 0; i < detectedArray.length; i++) {
    if (detectedArray[i] == "c") {
      countselect_c++;
    } else if (detectedArray[i] == "d") {
      countselect_a++;
    } else if (detectedArray[i] == "a") {
      countselect_a++;
    } else if (detectedArray[i] == "Null") {
      countselect_null++;
    }
  }
  if (countselect_c == countselect_d && countselect_d == countselect_a && countselect_a > 0) {
    finalselect = random(selects);
  } else if (countselect_c == countselect_d && countselect_c > countselect_a) {
    finalselect = random(selects_na);
  } else if (countselect_c == countselect_a && countselect_c > countselect_d) {
    finalselect = random(selects_nd);
  } else if (countselect_d == countselect_a && countselect_d > countselect_c) {
    finalselect = random(selects_nc);
  } else if (countselect_c > countselect_d && countselect_c > countselect_a) {
    finalselect = "c";
  } else if (countselect_d > countselect_c && countselect_d > countselect_a) {
    finalselect = "d";
  } else if (countselect_a > countselect_c && countselect_a > countselect_d) {
    finalselect = "a";
  } else {
    finalselect = "Null";
  }
}

function gotPoses(poses) {
  if (poses.length > 0) {
    detectedPose = poses;
  }
}

function modelLoaded() {
  readytoStart = true;
  console.log('poseNet loaded!');
}

function tutorialGo() {
  switch(explanation) {
    case 1:
    //manual
      tutorial_1();
      break;
    case 2:
    //tuto explain
      tutorial_2();
      break;
    case 3:
    //charge
      tutorial_3();
      break;
    case 4:
    //defense
      tutorial_4();
      break;
    case 5:
    //attack
      tutorial_5();
      break;
  }
}

function tutorial_1() {
  sound_intro.stop();
  tt_timer -= 1;
  imageMode(CENTER);
  image(howToPlayImage_0, width/2, height/2, width, height);
}

function tutorial_2() {
  tt_timer -= 1;
  imageMode(CENTER);
  image(howToPlayImage_1, width/2, height/2, width, height);
  }

function tutorial_3() {
  imageMode(CENTER);
  image(tt_background, width/2, height/2, width, height);
  videoDisplay();
  image(piccoloImage_charge, width * 3 / 4, height / 2, height * 9 / 16, height * 3 / 4);
  gamedesign_baseline();

  switch (tt_stage_3) {
    case 1:
    //ready
    imageMode(CENTER);
    image(poseImage, width/2, height/2, width * 4/15, width* 2/ 15);
    detectedArray = [];

    timer -= 1;
    if (timer <= 0) {
      timer = inter;
      tt_stage_3 = 2;
    }
      break;
    case 2:
    //select
    //machine learning
    if (timer == int(inter*3/4)) {
      classifyPose();
    }

    imageMode(CENTER);
    image(freezeImage, width/2, height/2, width * 4/15, width* 2/ 15);

    timer -= 1;
    if (timer <= 0) {
      timer = inter/2;
      tt_stage_3 = 3;
    }
      break;

    case 3:
    //display

    timer -= 1;

    if (finalselect == "c") {
      imageMode(CENTER);
      image(successText, width/2, height/2, width/10, width/10);

      if (timer <= 0) {
        timer = inter;
        tt_clear = true;
      }
    } else {
      imageMode(CENTER);
      image(failImage, width/2, height/2, width * 4/15, width* 2/ 15);
      if (timer <= 0) {
        timer = inter;
        tt_stage_3 = 1;
      }
    }
      break;
  }
  imageMode(CENTER);
  // image(tt_title, width/2, height/2, width, height);
  // image(tt_text, width/2, height/2, width, height);
  image(tt_display_3, width/2, height/2, width, height);
  if (tt_clear) {
    tt_clear = false;
    explanation += 1;
  }
}

function tutorial_4() {
  imageMode(CENTER);
  image(tt_background, width/2, height/2, width, height);
  videoDisplay();
  image(piccoloImage_attack, width * 3 / 4, height / 2, height * 9 / 16, height * 3 / 4);
  gamedesign_baseline();

  switch (tt_stage_4) {
    case 1:
    //ready
    imageMode(CENTER);
    image(poseImage, width/2, height/2, width * 4/15, width* 2/ 15);
    detectedArray = [];

    timer -= 1;
    if (timer <= 0) {
      timer = inter;
      tt_stage_4 = 2;
      finalselect = "";
    }
      break;
    case 2:
    //select
    //machine learning
    if (timer == int(inter*3/4)) {
      classifyPose();
    }

    imageMode(CENTER);
    image(freezeImage, width/2, height/2, width * 4/15, width* 2/ 15);

    timer -= 1;
    if (timer <= 0) {
      timer = inter/2;
      tt_stage_4 = 3;
    }
      break;

    case 3:
    //display

    timer -= 1;

    if (finalselect == "a") {
      imageMode(CENTER);
      image(successText, width/2, height/2, width/10, width/10);
      if (timer <= 0) {
        timer = inter;
        tt_clear = true;
      }
    } else {
      imageMode(CENTER);
      image(failImage, width/2, height/2, width * 4/15, width* 2/ 15);
      if (timer <= 0) {
        timer = inter;
        tt_stage_4 = 1;
      }
    }
      break;
  }

  imageMode(CENTER);
  // image(tt_title, width/2, height/2, width, height);
  // image(tt_text, width/2, height/2, width, height);
  image(tt_display_4, width/2, height/2, width, height);
  if (tt_clear) {
    tt_clear = false;
    explanation += 1;
  }
}

function tutorial_5() {
  imageMode(CENTER);
  image(tt_background, width/2, height/2, width, height);
  gamedesign();

  switch (tt_stage_5) {
    case 1:
    ballC = 0;
    ballP = 0;
    //ready(pose)
    imageMode(CENTER);
    image(poseImage, width/2, height/2, width * 4/15, width* 2/ 15);

    timer -= 1;
    if (timer <= 0) {
      timer = inter;
      tt_stage_5 = 2;
    }
      break;
    case 2:
    //select(freeze)
    finalselect = "c";
    c_select = "a";
    imageMode(CENTER);
    image(freezeImage, width/2, height/2, width * 4/15, width* 2/ 15);

    timer -= 1;
    if (timer <= 0) {
      timer = inter;
      tt_stage_5 = 3;
      }
      break;

    case 3:
    //display
    selectDisplay();
    timer -= 1;
    if (timer <= 0) {
      timer = inter/2;
      tt_stage_5 = 4;
    }
      break;
    case 4:
    timer -= 1;
    if (gaugeP > 2) {
      imageMode(CENTER);
      image(successText, width/2, height/2, width/10, width/10);
      if (timer <= 0) {
        gaugeP = gaugeMax;
        timer = inter;
        tt_stage_5 = 1;
        tt_clear = true;
      }
    } else {
      imageMode(CENTER);
      image(failImage, width/2, height/2, width * 4/15, width* 2/ 15);
      if (timer <= 0) {
        gaugeP = gaugeMax;
        timer = inter;
        tt_stage_5 = 1;
      }
    }
      break;
  }

  imageMode(CENTER);
  // image(tt_title, width/2, height/2, width, height);
  // image(tt_text, width/2, height/2, width, height);
  image(tt_display_5, width/2, height/2, width, height);
  if (tt_clear) {
    step = 1.5;
    first_game_boolean = false;
  }
}

function mousePressed() {
  if (explanation == 4) {
    timer = inter;
    explanation = 5;
  }
}
