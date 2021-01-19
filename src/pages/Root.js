import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getActiveUsers } from "../api.js";
import { Loading,  ActiveUser } from "../components";

import Peer from 'skyway-js';
const peer = new Peer({key: '78b1f9a5-e016-412c-98e0-e1175640cfe1', debug: 3});


export function RootPage() {
  const [active_users, setActiveUsers] = useState(null);
  
  useEffect(() => {
    getActiveUsers({ limit: 3 }).then((data) => {
      setActiveUsers(data);
    });
  }, []);

  const [myId, setMyId] = useState('')
  const [callId, setCallId] = useState('')
  const localVideo = useRef(null)
  const remoteVideo = useRef(null)
  peer.on('open', () => {
    setMyId(peer.id)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
      localVideo.current.srcObject = localStream
    })
  });
  peer.on('call', mediaConnection => {
    mediaConnection.answer(localVideo.current.srcObject)

    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream
    })
  })

  const makeCall = () => {
    const mediaConnection = peer.call(callId, localVideo.current.srcObject)
    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream
      await remoteVideo.current.play().catch(console.error)
    })
  }
  return (
    <>
      <h2 className="title is-3">アクティブ一覧</h2>
      <div className="block">
        {active_users == null ? (
          <Loading />
        ) : (
          active_users.rows.map((active_user) => {
            return <ActiveUser key={active_user.id} active_user={active_user} />;
          })
        )}
      </div>
      <video width="400px" autoplay muted playsinline ref={localVideo}></video>
      <p id="my-id"></p>
          <div>
      <div>skyway test</div>
      <div><video width="400px" autoPlay muted playsInline ref={localVideo}></video></div>
      <div>{myId}</div>
      <div>
        <input value={callId} onChange={e => setCallId(e.target.value)}></input>
        <button onClick={makeCall}>発信</button>
      </div>
      <div><video width="400px" autoPlay muted playsInline ref={remoteVideo}></video></div>
    </div>
    </>
  );
}
