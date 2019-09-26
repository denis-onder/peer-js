var peer = new Peer({
  host: "localhost",
  port: 9000
});

peer.connect();

peer.on("open", id => console.log(id));

document.getElementById("peer_id").addEventListener("keydown", async e => {
  if (e.keyCode === 13) {
    peer.call(
      e.target.value,
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    );
  }
});

peer.on("call", async call => {
  call.answer();
  call.on(
    "stream",
    stream => (document.getElementById("test").srcObject = stream)
  );
});

setInterval(() => {
  const output = document.getElementById("users");
  output.innerHTML = "";
  fetch("http://localhost:9000/users")
    .then(res => res.json())
    .then(data =>
      data.map((v, i) => (output.innerHTML += `<p>${i}: ${v}</p>`))
    );
}, 1000);
