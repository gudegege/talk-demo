import {useState } from "react";

import Peer from 'skyway-js';
const peer = new Peer({key: process.env.REACT_APP_SKYWAY_KEY, debug: 3});

function Calling() {
  return (
    <p><b className="has-text-danger">呼び出し中</b><br />
      <img
        className="is_rounded"
        src="/images/Preloader_10.gif"
        alt="preloader"
      />
    </p>
  );
}
export function RootPage() {
  const [myId, setMyId] = useState('')
  const [peers, setPeers] = useState([])
  const [call_stat, setCallStat] = useState(0)
  const [caller_stat, setCallerStat] = useState(0)
  let localStream;

  // カメラ映像取得
  navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then( stream => {
    // 成功時にvideo要素にカメラ映像をセットし、再生
    const videoElm = document.getElementById('my-video');
    videoElm.srcObject = stream;
    // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
    localStream = stream;
  }).catch( error => {
    // 失敗時にはエラーログを出力
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
  });

  peer.on('open', () => {
    setMyId(peer.id)
    peer.listAllPeers((peers) => {
      setPeers(peers);
    });
  })

  // 発信処理
  const makeCall = () => {
    const theirID = document.getElementById('their-id').value;
    console.log(theirID)
    setCallerStat(1)
    setTimeout(() => {
      console.log('イド');
      mediaConnection.answer(localStream);
      setEventListener(mediaConnection);
      setCallStat(2)
      setCallerStat(2)
    }, 5000);
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
  };

  // イベントリスナを設置する関数
  const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      // video要素にカメラ映像をセットして再生
      const videoElm = document.getElementById('their-video')
      videoElm.srcObject = stream;
    });
  }

  //着信処理
  peer.on('call', mediaConnection => {
    setCallStat(1)
    setTimeout(() => {
      console.log('イド');
      mediaConnection.answer(localStream);
      setEventListener(mediaConnection);
      setCallStat(2)
      setCallerStat(2)
    }, 5000);
  });

  return (
    <>
      <h2 className="title is-3">テスト</h2>
      <div className="block">
        <article className="box">
          <div className="columns">
            <div className="column is-3">
              <figure className="image is-128x128">
                <img className="is_rounded" src="/images/monster01.png" alt="1" />
              </figure>
            </div>
            <div className="column">
              <h3 className="title is-5">
                名前: あなた<br />
                <span className={"tag is-danger"}>
                  状態: ON
                </span><br />
                ID: {myId}<br />
                <select id="their-id">
                {peers.map((peer) => {
                  return <option value={peer} key={peer} >{peer}</option>
                })}
                </select>
                <button onClick={makeCall}>発信</button>
                <p id="my-id"></p>
                { caller_stat == 1 ? <Calling /> : "" }
                <video id="my-video" width="200px" autoPlay muted playsInline style={{display: caller_stat > 1 ? 'block' : 'none' }} ></video>
              </h3>
            </div>
          </div>
        </article>
        <article className="box">
          <div className="columns">
            <div className="column is-3">
              <figure className="image is-128x128">
                <img
                  className="is_rounded"
                  src="/images/monster02.png"
                  alt="2"
                />
              </figure>
            </div>
            <div className="column">
              <h3 className="title is-5">
                名前: 相手<br />
                <span className={"tag is-danger"}>
                  状態: ON
                </span><br />
                { call_stat == 1 ? <Calling /> : "" }
                <video id="their-video" width="300px" autoPlay playsInline style={{display: call_stat > 1 ? 'block' : 'none' }}></video>
              </h3>
            </div>
          </div>
          <div>
          </div>
        </article>
      </div>
    </>
  );
}
