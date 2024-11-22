"use strict";

// タイルを格納する配列
const tiles = [];

// 初期化処理
function init() {
  let table = document.getElementById("table"); // テーブル要素を取得

  // 4x4 のタイルを作成
  for (let i = 0; i < 4; i++) {
    // 行を作成
    let tr = document.createElement("tr"); // 行を作成
    for (let j = 0; j < 4; j++) {
      // 列を作成
      let td = document.createElement("td"); // セルを作成
      let index = i * 4 + j; // タイルのインデックス計算

      // タイルにクラス名を設定
      td.className = "tile";
      td.index = index; // インデックスを設定
      td.value = index; // 値を設定
      td.textContent = index == 0 ? "" : index; // 0のタイルは空白に、その他はインデックスを表示

      td.onclick = click; // タイルがクリックされたときに click 関数を呼び出す

      tr.appendChild(td); // 行にセルを追加
      tiles.push(td); // セルをタイル配列に追加
    }
    table.appendChild(tr); // テーブルに行を追加
  }

  // タイルをシャッフルする（ランダムにクリック）
  for (let i = 0; i < 1000; i++) {
    // 1000回シャッフル
    click({ target: { index: Math.floor(Math.random() * 16) } }); // ランダムにタイルをクリック
  }
}

// タイルがクリックされたときに実行される関数
function click(e) {
  let i = e.target.index; // クリックされたタイルのインデックスを取得

  // 上のタイルが空なら交換
  if (i - 4 >= 0 && tiles[i - 4].value == 0) {
    swap(i, i - 4); // 上のタイルと入れ替え
  }
  // 下のタイルが空なら交換
  else if (i + 4 < 16 && tiles[i + 4].value == 0) {
    swap(i, i + 4); // 下のタイルと入れ替え
  }
  // 左のタイルが空なら交換
  else if (i % 4 != 0 && tiles[i - 1].value == 0) {
    swap(i, i - 1); // 左のタイルと入れ替え
  }
  // 右のタイルが空なら交換
  else if (i % 4 != 3 && tiles[i + 1].value == 0) {
    swap(i, i + 1); // 右のタイルと入れ替え
  }

  // ゲームがクリアされたかをチェック
  checkGameClear();
}

// タイルの値と表示を交換する関数
function swap(i, j) {
  let tmp = tiles[i].value; // i番目のタイルの値を一時保存
  tiles[i].textContent = tiles[j].textContent; // i番目のタイルのテキストをj番目のタイルのテキストに変更
  tiles[i].value = tiles[j].value; // i番目のタイルの値をj番目のタイルの値に変更
  tiles[j].textContent = tmp; // j番目のタイルのテキストを一時保存した値に変更
  tiles[j].value = tmp; // j番目のタイルの値を一時保存した値に変更
}

// ゲームクリアかどうかをチェックする関数
function checkGameClear() {
  // 完成した状態（左上が空白、横に1〜15が並ぶ）
  let completed = true;
  for (let i = 0; i < 16; i++) {
    if (tiles[i].value !== i) {
      // 各タイルがそのインデックスと一致しない場合、ゲームは未完成
      completed = false;
      break;
    }
  }

  // ゲームがクリアされた場合
  if (completed) {
    alert("Game Clear!!"); // ゲームクリアのアラートを表示
  }
}
