  (function () {
    const screen = document.querySelector('.screen');
    const buttons = document.querySelectorAll('button[data-num]');
    const clearBtn = document.querySelector('.btn-clear');
    const equal = document.querySelector('.btn-equal');

    let lastClickTime = 0;

    function updateClearButton() {
      if (screen.value.length > 0) {
        clearBtn.textContent = '⌫';
        clearBtn.style.fontWeight = '400';
        clearBtn.style.fontSize = '1rem';  // smaller delete symbol
      } else {
        clearBtn.textContent = 'C';
        clearBtn.style.fontWeight = '400';
        clearBtn.style.fontSize = '1.3rem'; // bigger C
      }
    }

    function toggleLastNumberSign(value) {
      const regex = /(-?\d*\.?\d*)$/;
      const match = value.match(regex);
      if (!match) return value;

      let lastNumber = match[0];
      let startIndex = value.lastIndexOf(lastNumber);

      if (lastNumber === '') return value;

      if (lastNumber.startsWith('-')) {
        lastNumber = lastNumber.slice(1);
      } else {
        lastNumber = '-' + lastNumber;
      }

      return value.slice(0, startIndex) + lastNumber;
    }

    buttons.forEach(button => {
      button.addEventListener('click', e => {
        const value = e.target.dataset.num;

        if (value === "+/-") {
          if (screen.value) {
            screen.value = toggleLastNumberSign(screen.value);
            updateClearButton();
            scrollScreenToRight();
          }
        } else if (value === "%") {
          if (screen.value) {
            try {
              const regex = /(-?\d*\.?\d*)$/;
              const match = screen.value.match(regex);
              if (match && match[0] !== '') {
                let num = parseFloat(match[0]);
                let newNum = num / 100;
                const rounded = Math.round(newNum * 10000) / 10000;
                screen.value = screen.value.slice(0, match.index) + rounded;
                updateClearButton();
                scrollScreenToRight();
              }
            } catch {}
          }
        } else {
          screen.value += value;
          updateClearButton();
          scrollScreenToRight();
        }
      });
    });

    function scrollScreenToRight() {
      screen.scrollLeft = screen.scrollWidth;
    }

    clearBtn.addEventListener('click', () => {
      const now = Date.now();
      if (clearBtn.textContent === 'C') {
        screen.value = "";
      } else {
        screen.value = screen.value.slice(0, -1);
      }
      updateClearButton();
      scrollScreenToRight();

      if (now - lastClickTime < 500) {
        screen.value = "";
        updateClearButton();
        scrollScreenToRight();
      }
      lastClickTime = now;
    });

    equal.addEventListener('click', () => {
      if (screen.value === '') {
        screen.value = "Enter value";
        setTimeout(() => {
          screen.value = "";
          updateClearButton();
          scrollScreenToRight();
        }, 1000);
      } else {
        try {
          let expression = screen.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
          let answer = eval(expression);
          if (!isFinite(answer) || isNaN(answer)) {
            screen.value = "Error";
            setTimeout(() => {
              screen.value = "";
              updateClearButton();
              scrollScreenToRight();
            }, 1500);
          } else {
            if (!Number.isInteger(answer)) {
              answer = Math.round(answer * 10000) / 10000;
            }
            screen.value = answer;
            updateClearButton();
            scrollScreenToRight();
          }
        } catch {
          screen.value = "Error";
          setTimeout(() => {
            screen.value = "";
            updateClearButton();
            scrollScreenToRight();
          }, 1500);
        }
      }
    });

    updateClearButton();
  })();
