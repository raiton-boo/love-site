document.addEventListener('DOMContentLoaded', function () {
  const message = document.getElementById('message');
  const leftBorder = document.getElementById('leftBorder');
  const rightBorder = document.getElementById('rightBorder');
  const loveMessage = document.getElementById('loveMessage');

  // 4段階の定義（距離ベース - 4段階をしっかり分ける）
  const messageStages = [
    {
      minDistance: 0,
      maxDistance: 12,
      text: '♥',
      color: '#ff1744',
    },
    {
      minDistance: 13,
      maxDistance: 18,
      text: 'I ♥ U',
      color: '#ff69b4',
    },
    {
      minDistance: 19,
      maxDistance: 24,
      text: 'I ♥ YOU',
      color: '#ff69b4',
    },
    {
      minDistance: 25,
      maxDistance: 999,
      text: 'I LOVE YOU',
      color: '#ff69b4',
    },
  ];

  let isDragging = false;
  let dragTarget = null;
  let startX = 0;
  let currentStageIndex = 3; // 初期は最長のメッセージ
  let currentDistance = 26; // 初期距離（I LOVE YOUでスタート）

  // 画面サイズに応じた最大距離を取得
  function getMaxDistance() {
    const screenWidth = window.innerWidth;
    const containerWidth = loveMessage.offsetWidth;
    const borderWidth = 60; // ボーダー文字の幅を考慮

    if (screenWidth <= 360) {
      return Math.min(15, containerWidth / 2 - 20);
    } else if (screenWidth <= 480) {
      return Math.min(20, containerWidth / 2 - 25);
    } else if (screenWidth <= 768) {
      return Math.min(30, containerWidth / 2 - 30);
    } else {
      return 40; // デスクトップ
    }
  }

  // 画面サイズに応じた最小距離を取得
  function getMinDistance() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 360) {
      return 5;
    } else if (screenWidth <= 480) {
      return 6;
    } else if (screenWidth <= 768) {
      return 7;
    } else {
      return 8; // デスクトップ
    }
  }

  // 初期距離を画面サイズに応じて設定
  function getInitialDistance() {
    const maxDist = getMaxDistance();
    return Math.min(26, maxDist);
  }

  function updateMessage(distance, animate = true) {
    // 段階決定（距離に基づいて正しいメッセージを選択）
    let newStageIndex = 0; // デフォルトはハート絵文字
    for (let i = 0; i < messageStages.length; i++) {
      if (
        distance >= messageStages[i].minDistance &&
        distance <= messageStages[i].maxDistance
      ) {
        newStageIndex = i;
        break;
      }
    }

    const currentStage = messageStages[newStageIndex];

    // |の位置を更新（マイナス値で外側に配置）
    leftBorder.style.left = `-${distance}px`;
    rightBorder.style.right = `-${distance}px`;

    // 段階が変わった場合のみアニメーション
    if (newStageIndex !== currentStageIndex && animate) {
      currentStageIndex = newStageIndex;

      // 抑えめなメッセージ変更アニメーション
      message.classList.add('message-changing');

      setTimeout(() => {
        message.classList.remove('message-changing');
      }, 400);
    } else if (!animate) {
      currentStageIndex = newStageIndex;
    }

    // メッセージとスタイル更新
    message.textContent = currentStage.text;
    message.style.color = currentStage.color;

    // 特別なエフェクト：ハート絵文字の時
    if (currentStage.text === '♥') {
      message.style.animation = 'heartbeat 1.2s ease-in-out infinite';
    } else {
      if (!message.classList.contains('message-changing')) {
        message.style.animation = 'none';
      }
    }
  }

  // ドラッグ開始
  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    dragTarget = e.target;
    startX = e.clientX || e.touches[0].clientX;

    // カーソルスタイル
    document.body.style.cursor = 'grabbing';
    dragTarget.style.cursor = 'grabbing';

    console.log('Drag started'); // デバッグ用
  }

  // ドラッグ中
  function drag(e) {
    if (!isDragging || !dragTarget) return;

    e.preventDefault();
    const clientX = e.clientX || e.touches[0].clientX;
    const deltaX = clientX - startX;

    const minDist = getMinDistance();
    const maxDist = getMaxDistance();

    // 左右の|を別々に制御
    if (dragTarget === leftBorder) {
      // 左の|: 右にドラッグすると距離が狭まる（内側に移動）
      currentDistance = Math.max(
        minDist,
        Math.min(maxDist, currentDistance - deltaX * 0.25)
      );
    } else if (dragTarget === rightBorder) {
      // 右の|: 右にドラッグすると距離が広がる（外側に移動）
      currentDistance = Math.max(
        minDist,
        Math.min(maxDist, currentDistance + deltaX * 0.25)
      );
    }

    updateMessage(currentDistance, true);
    startX = clientX;
    console.log(
      'Dragging, distance:',
      currentDistance,
      'min:',
      minDist,
      'max:',
      maxDist
    ); // デバッグ用
  }

  // ドラッグ終了
  function stopDrag() {
    if (!isDragging) return;

    isDragging = false;
    dragTarget = null;
    document.body.style.cursor = 'default';

    // カーソルリセット
    leftBorder.style.cursor = 'grab';
    rightBorder.style.cursor = 'grab';

    console.log('Drag stopped'); // デバッグ用
  }

  // マウスイベント
  leftBorder.addEventListener('mousedown', startDrag);
  rightBorder.addEventListener('mousedown', startDrag);

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);

  // タッチイベント
  leftBorder.addEventListener('touchstart', startDrag, { passive: false });
  rightBorder.addEventListener('touchstart', startDrag, { passive: false });

  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('touchend', stopDrag);

  // キーボードショートカット
  document.addEventListener('keydown', function (e) {
    const minDist = getMinDistance();
    const maxDist = getMaxDistance();

    if (e.key === 'ArrowLeft') {
      currentDistance = Math.max(minDist, currentDistance - 2);
      updateMessage(currentDistance);
    } else if (e.key === 'ArrowRight') {
      currentDistance = Math.min(maxDist, currentDistance + 2);
      updateMessage(currentDistance);
    }
  });

  // 自動デモ（スペースキー）
  let autoDemo = false;
  document.addEventListener('keydown', function (e) {
    if (e.key === ' ') {
      e.preventDefault();
      autoDemo = !autoDemo;

      if (autoDemo) {
        let direction = -1;
        const demo = setInterval(() => {
          if (!autoDemo) {
            clearInterval(demo);
            return;
          }

          const minDist = getMinDistance();
          const maxDist = getMaxDistance();

          currentDistance += direction * 0.6;
          if (currentDistance <= minDist + 2) direction = 1;
          if (currentDistance >= maxDist - 2) direction = -1;

          updateMessage(currentDistance);
        }, 50);
      }
    }
  });

  // 初期設定
  currentDistance = getInitialDistance();
  updateMessage(currentDistance, false);

  // ウィンドウリサイズ時の対応
  window.addEventListener('resize', function () {
    const maxDist = getMaxDistance();
    const minDist = getMinDistance();

    // 現在の距離が新しい制限を超えている場合は調整
    if (currentDistance > maxDist) {
      currentDistance = maxDist;
      updateMessage(currentDistance, false);
    } else if (currentDistance < minDist) {
      currentDistance = minDist;
      updateMessage(currentDistance, false);
    }
  });

  // 3秒後に指示を非表示
  setTimeout(() => {
    const instruction = document.querySelector('.instruction');
    if (instruction) {
      instruction.style.animation = 'none';
      instruction.style.opacity = '0';
    }
  }, 5000);
});
