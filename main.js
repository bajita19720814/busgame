'use strict';
{
  const main = document.querySelector('main');
  const guest = document.getElementById('guest');
  const bus = document.getElementById('bus');
  const result = document.getElementById('result');
  const question = document.getElementById('question');
  const answerboard = document.getElementById('answerboard');
  const adultImgs = ["img/man1.png", "img/man2.png", "img/man3.png", "img/woman1.png", "img/woman2.png"];
  const kidImgs = ["img/boy1.png", "img/boy2.png", "img/boy3.png", "img/girl1.png", "img/girl2.png"];
  const gohstImgs = ["img/amabie.png", "img/franken.png", "img/miiraotoko.png", "img/kappa.png", "img/tengu.png"];
  const animalImgs = ["img/dog1.png", "img/dog2.png", "img/horse.png", "img/nihonjika.png", "img/pronghorn.png"];
  const guestClass = ["adult", "kid", "gohst", "animal"];
  let correctCount = 0;
  let wrongCount = 0;
  let isGaming = false;
  const questions = [
    {c: "人", q: "人間"},
    {c: "匹", q: "妖怪"},
    {c: "頭", q: "動物"},
  ];
  function getRandomImg(imgs) {
    return imgs.splice(Math.floor(Math.random() * imgs.length), 1)[0];
  }  
  
  class Game {
    constructor(n1, n2) {
      this.adultImgs = [...adultImgs];
      this.kidImgs = [...kidImgs];
      this.gohstImgs = [...gohstImgs];
      this.animalImgs = [...animalImgs];
      this.guestImages = [this.adultImgs, this.kidImgs, this.gohstImgs, this.animalImgs];
      this.n1 = n1;
      this.n2 = n2;
      this.catchCount = 0;
      this.onboardAdults = [];
      this.onboardKids = [];
      this.onboardGohsts = [];
      this.onboardAnimals = [];
      this.onboardGuests = [this.onboardAdults, this.onboardKids, this.onboardGohsts, this.onboardAnimals];
      this.getinAdult = undefined;
      this.getinKid = undefined;
      this.getingohst = undefined;
      this.getinAnimal = undefined;
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
        if (correctCount < 6 && (correctCount + wrongCount) < 10) {
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
      const qIndex = Math.floor(Math.random() * 3);
      question.textContent = `${questions[qIndex].q}は、何${questions[qIndex].c}でしょう?`;
      console.log(this.onboardAdults.length);
      console.log(this.onboardKids.length);
      console.log(this.onboardGohsts.length);
      console.log(this.onboardAnimals.length);
      for(let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.textContent = `${i}${questions[qIndex].c}`;
        answerboard.appendChild(div);
        div.addEventListener('click', () => {
          if ((qIndex === 0 && i === (this.onboardAdults.length + this.onboardKids.length)) || (qIndex === 1 && i === this.onboardGohsts.length) || (qIndex === 2 && i === this.onboardAnimals.length)) {
            correctCount++;
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
        this.getinAdult = undefined;
        this.getinKid = undefined;
        this.getinGohst = undefined;
        this.getinAnimal = undefined;
        bus.classList.remove('flameout');
        bus.classList.add('hidden');
        if (this.catchCount === Math.floor((correctCount + 2) / 2) + 1) {
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
      setTimeout(() => {
        while (guest.firstChild) {
          guest.removeChild(guest.firstChild);
        }
        this.catchCount++;
        this.setGetoutGuests();
        guest.classList.remove('getin');
      }, 1000);
    }
    setGuestChange() {
      setTimeout(() => {
        guest.classList.add('getin');
        this.changeGuests();
      }, 1000);
      setTimeout(() => {
        this.leaveBus();
        if(this.getinAdult) {
          this.onboardAdults.push(this.getinAdult);
        }
        if(this.getinKid) {
          this.onboardKids.push(this.getinKid);
        }
        if(this.getinGohst) {
          this.onboardGohsts.push(this.getinGohst);
        }
        if(this.getinAnimal) {
          this.onboardAnimals.push(this.getinAnimal);
        }
      }, 2100);
    }
    getGuests(n) {
      this.guestImages.forEach((images, index) => {
        if (Math.random() < this.n1) {
          const img = document.createElement('img');
          img.src = getRandomImg(images);
          switch (index) {
            case 0:
              this.getinAdult = img.src;
              break;
            case 1:
              this.getinKid = img.src;
              break;
            case 2:
              this.getinGohst = img.src;
              break;
            case 3:
              this.getinAnimal = img.src;
              break;
          }
          img.classList.add(guestClass[index]);
          guest.appendChild(img);
        }  
      });
      result.classList.remove('show');
      bus.classList.remove('flamein');
      this.setGuestChange();
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