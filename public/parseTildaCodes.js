let arr = [];
const codes = document.querySelectorAll('code');
codes.forEach(code => {
    arr.push(code.textContent);
});

const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(arr, null, 2)], {
    type: "text/plain"
  }));
  a.setAttribute("download", "data.txt");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);