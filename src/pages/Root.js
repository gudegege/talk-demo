import {useState } from "react";

import Peer from 'skyway-js';
const peer = new Peer({key: process.env.REACT_APP_SKYWAY_KEY, debug: 3});

export function RootPage() {
  const [myId, setMyId] = useState('')
  const [peers, setPeers] = useState([])
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
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
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
                <video id="my-video" width="400px" autoPlay playsInline></video>
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
                <video id="their-video" width="400px" autoPlay playsInline></video>
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
