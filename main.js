hpts = "";
ppts = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_status = "";
function preload(){
    hpts = loadSound("hpts.mp3");
    ppts = loadSound("ppts.mp3");
}

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(450, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    image(video, 0, 0, 600, 450);

    fill("#FF0000");
    stroke("800000");

    song_status = HPTS.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        ppts.stop();

        if(song_status == false){
            hpts.play();
            document.getElementById("song").innerHTML = "Song = Harry Potter Theme Song";
        }
    }

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX, "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX, "rightWristY = " + rightWristY);

    }
}