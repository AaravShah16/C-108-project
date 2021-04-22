prediction_1 = ""
prediction_2 = ""
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})
camera = document.getElementById("camera")
Webcam.attach('#camera')
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'">'
    })
}
console.log('ml5veersion:',ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X1X2cERbL/model.json',modelLoaded)
function modelLoaded(){
console.log("modelLoaded")
}
function speak(){
    var synth = window.speechSynthesis
    speak_data1 = "The first prediction is"+prediction_1
    speak_data2 = "The second prediction id"+prediction_2
    var utterthis = new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterthis)
}
function check(){
    img = document.getElementById("captured_image")
    classifier.classify(img,gotresult)
}
function gotresult(error,results){
if (error){
    console.error(error)
}
else{
    console.log(results)
    document.getElementById("result_emotion_name").innerHTML = results[0].label
    document.getElementById("result_emotion_name2").innerHTML = results[1].label
    prediction_1 = results[0].label
    prediction_2 = results[1].label
    speak()
    if (results[0].label == "This is looking amazimg"){
        document.getElementById("update_emoji_1").innerHTML = "&#128076;"
    }
    if (results[0].label == "All the best"){
        document.getElementById("update_emoji_1").innerHTML = "&#128077"
    }
    if (results[0].label == "That was a marvolus victory"){
        document.getElementById("update_emoji_1").innerHTML = "&#9996;"
    }
    if (results[1].label == "This is looking amazimg"){
        document.getElementById("update_emoji_2").innerHTML = "&#128076;"
    }
    if (results[1].label == "All the best"){
        document.getElementById("update_emoji_2").innerHTML = "&#128077"
    }
    if (results[1].label == "angry"){
        document.getElementById("update_emoji_2").innerHTML = "&#9996;"
    }
}
}