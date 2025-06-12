(function() {
    const screen = document.querySelector('.screen');
    const buttons = document.querySelectorAll('button[data-num]');
    const clear = document.querySelector('.btn-clear');
    const equal = document.querySelector('.btn-equal');

    buttons.forEach(button => {
        button.addEventListener('click', e => {
            const value = e.target.dataset.num;
            if (value !== undefined) {
                screen.value += value;
            }
        });
    });

    equal.addEventListener('click', () => {
        if (screen.value === '') {
            screen.value = "Please enter";
            setTimeout(() => screen.value = "", 1000);
        } else {
            try {
                // Replace multiplication and division symbols for JS eval
                let expression = screen.value.replace(/×/g, '*').replace(/÷/g, '/');
                // Evaluate expression
                let answer = eval(expression);
                // Handle non-numeric or infinite results
                if (answer === Infinity || answer === -Infinity || isNaN(answer)) {
                    screen.value = "Error";
                    setTimeout(() => screen.value = "", 1500);
                } else {
                    screen.value = answer;
                }
            } catch (error) {
                screen.value = "Error";
                setTimeout(() => screen.value = "", 1500);
            }
        }
    });

    clear.addEventListener('click', () => {
        screen.value = "";
    });
})();
