reset.addEventListener("click",() => {
    boxes.forEach(btn => {
        btn.innerText="";
        btn.disabled = false;
        turn0 = true;
    });
    console.log("Reset");
});
