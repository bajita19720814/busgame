'use strict';
{
  const main = document.querySelector('main');
  const guest = document.getElementById('guest');
  const bus = document.getElementById('bus');
  const result = document.getElementById('result');
  const question = document.getElementById('question');
  const answerboard = document.getElementById('answerboard');
  const manImgs = ["img/man1.png", "img/man2.png", "img/man3.png", "img/man4.png", "img/man5.png"];
  const womanImgs = ["img/woman1.png", "img/woman2.png", "img/woman3.png", "img/woman4.png", "img/woman5.png"];
  const boyImgs = ["img/boy1.png", "img/boy2.png", "img/boy3.png", "img/boy4.png", "img/boy5.png"];
  const girlImgs = ["img/girl1.png", "img/girl2.png", "img/girl3.png", "img/girl4.png", "img/girl5.png"];
  
  const guestClass = ["adult", "adult", "kid", "kid"];
  let correctCount = 0;
  let wrongCount = 0;
  let point = 0;
  let isGaming = false;
  const questions = ["大人", "子供"];
  function getRandomImg(imgs) {
    return imgs.splice(Math.floor(Math.random() * imgs.length), 1)[0];
  }  
  
  class Game {
    constructor(n1, n2) {
      this.manImgs = [...manImgs];
      this.womanImgs = [...womanImgs];
      this.boyImgs = [...boyImgs];
      this.girlImgs = [...girlImgs];
      this.guestImages = [this.manImgs, this.womanImgs, this.boyImgs, this.girlImgs];
      this.n1 = n1;
      this.n2 = n2;
      this.catchCount = 0;
      this.onboardMen = [];
      this.onboardWomen = [];
      this.onboardBoys = [];
      this.onboardGirls = [];
      this.onboardGuests = [this.onboardMen, this.onboardWomen, this.onboardBoys, this.onboardGirls];
      this.getinMan = undefined;
      this.getinWoman = undefined;
      this.getinBoy = undefined;
      this.getinGirl = undefined;
      this.getGuests(this.n1);
    }
    gameOver() {
      question.textContent = `正解：${correctCount}, 不正解 :${wrongCount}だったよ。もう一度チャレンジするにはクリックしてね。`;
      isGaming = false;
    }
    showResult() {
      while(answerboard.firstChild) {
        answerboard.removeChild(answerboard.firstChild);
      }
      this.onboardGuests.forEach((onboarder, index) => {
        onboarder.forEach(guest => {
          const img = document.createElement('img');
          img.src = guest;
          img.classList.add(guestClass[index]);
          answerboard.appendChild(img);
        }); 
        answerboard.style.justifyContent = 'center';
      });
      setTimeout(() => {
        if ((correctCount + wrongCount) < 10) {
          bus.classList.remove('hidden');
          bus.classList.add('flamein');
          new Game(0.7, 0.6);
        } else {
          this.gameOver();
        }
      }, 1200);
    }
    setQuestion() {
      while(answerboard.firstChild) {
        answerboard.removeChild(answerboard.firstChild);
      }
      const qIndex = Math.floor(Math.random() * 2);
      question.textContent = `${questions[qIndex]}は、何人でしょう?`;
      console.log(this.onboardGuests);
      for(let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.textContent = i;
        answerboard.appendChild(div);
        div.addEventListener('click', () => {
          if ((qIndex === 0 && i === (this.onboardMen.length + this.onboardWomen.length)) || (qIndex === 1 && i === (this.onboardBoys.length + this.onboardGirls.length))) {
            correctCount++;
            point += this.catchCount;
            console.log(point);
            question.textContent = '正解！バスに乗っている人は下の人たちだよ。';
          } else {
            wrongCount++;
            question.textContent = '不正解！バスに乗っている人は下の人たちだよ。';
          }
          this.showResult();
        });
      }
      answerboard.style.justifyContent = 'space-between';
      result.classList.add('show');
    }
    startAgain() {
      setTimeout(() => {
        bus.classList.add('flamein');        
      }, 1000);
      setTimeout(() => {
        this.getGuests(this.n2);
        bus.classList.remove('hidden');
        
      }, 2000);
    }
    leaveBus() {
      setTimeout(() => {
        bus.classList.add('flameout');
      }, 1000);
      setTimeout(() => {
        while (guest.firstChild) {
          guest.removeChild(guest.firstChild);
        }
        this.getinMan = undefined;
        this.getinWoman = undefined;
        this.getinBoy = undefined;
        this.getinGirl = undefined;
        bus.classList.remove('flameout');
        bus.classList.add('hidden');
        if (this.catchCount === Math.floor((correctCount + 2) / 3) + 2) {
          this.setQuestion();
        } else {
          this.startAgain();
        }
      }, 2000);
    }
    setGetoutGuests() {
      this.onboardGuests.forEach((onboarder, index) => {
        if (onboarder.length > 0 && Math.random() < 0.4) {
          const img = document.createElement('img');
          img.src = onboarder.splice(Math.floor(Math.random() * onboarder.length), 1)[0];
          img.classList.add(guestClass[index]);
          guest.appendChild(img);
        }
      });
    }
    changeGuests() {
        while (guest.firstChild) {
          guest.removeChild(guest.firstChild);
        }
        this.catchCount++;
        this.setGetoutGuests();
        guest.classList.remove('getin');
    }
    setGuestChange() {
      guest.classList.add('getin');
      setTimeout(() => {
        this.changeGuests();
      }, 1000);
      setTimeout(() => {
        this.leaveBus();
        if(this.getinMan) {
          this.onboardMen.push(this.getinMan);
        }
        if(this.getinWoman) {
          this.onboardWomen.push(this.getinWoman);
        }
        if(this.getinBoy) {
          this.onboardBoys.push(this.getinBoy);
        }
        if(this.getinGirl) {
          this.onboardGirls.push(this.getinGirl);
        }
      }, 1100);
    }
    getGuests(n) {
      this.guestImages.forEach((images, index) => {
        if (Math.random() < this.n1) {
          const img = document.createElement('img');
          img.src = getRandomImg(images);
          switch (index) {
            case 0:
              this.getinMan = img.src;
              break;
            case 1:
              this.getinWoman = img.src;
              break;
            case 2:
              this.getinBoy = img.src;
              break;
            case 3:
              this.getinGirl = img.src;
              break;
          }
          img.classList.add(guestClass[index]);
          guest.appendChild(img);
        }  
      });
      result.classList.remove('show');
      bus.classList.remove('flamein');
      setTimeout(() => {
        this.setGuestChange();
      }, 1000);
    }
  }
  main.addEventListener('click', () => {
    if (isGaming) {
      return;
    }  
    correctCount = 0;
    wrongCount = 0;  
    isGaming = true;
    bus.classList.remove('hidden');
    bus.classList.add('flamein');
    new Game(0.7, 0.6);
    
  });
}