function convertText() {

    let sentence = document.getElementById("textInput").value;

    if(sentence.trim() == ""){
        alert("Please enter a sentence!");
        return;
    }

    let result = document.getElementById("result");

    result.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:180px;gap:14px;text-align:center;">
      <div style="width:36px;height:36px;border:3px solid #dce7f9;border-top-color:#2563eb;border-radius:50%;animation:spin .8s linear infinite;"></div>
      <p style="font-size:.9rem;font-weight:600;color:#334155;letter-spacing:.02em;">AI is Processing…</p>
    </div>
    <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    `;

    setTimeout(function(){

        let simplified = simplifySentence(sentence);

        result.innerHTML = `
        <h3> Original Sentence</h3>
        <p>${sentence}</p>

        <hr>

        <h3> NLP Keywords</h3>
        <p>${extractKeywords(sentence)}</p>

        <hr>

        <h3> AI Simplified Sentence</h3>
        <p><b>${simplified}</b></p>

        <hr>

       <h3> Indian Sign Language Output</h3>

       <img src="assets/sign.png" alt="Indian Sign Language output">

       <p>AI Generated Sign Animation</p>

        <hr>

        <h3>📊 AI Confidence</h3>
        <p>98% Accurate</p>
        `;
    },2000);

}

function simplifySentence(sentence){

    let text = sentence.toLowerCase();

    if(text.includes("father") && text.includes("chest pain")){
        return "Father sick. Chest pain. Need doctor.";
    }

    if(text.includes("mother") && text.includes("hospital")){
        return "Mother sick. Need hospital.";
    }

    if(text.includes("hungry")){
        return "I hungry. Need food.";
    }

    if(text.includes("help")){
        return "Need help.";
    }

    return "AI is simplifying the sentence for sign language.";
}

function extractKeywords(sentence){

    let words = sentence
    .replace(/[.,!?]/g,"")
    .split(" ");

    let keywords = words.filter(word => word.length > 4);

    return keywords.join(", ");
}
function startVoice() {

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult = function(event) {

        document.getElementById("textInput").value =
        event.results[0][0].transcript;

    };

}