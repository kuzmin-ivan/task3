let checkAllBox = document.querySelector('#check-all-letters');

function checkAll() {
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    checkBoxes.forEach(
        checkBox => {
            checkBox.checked = checkAllBox.checked;
        }
    );
}

function uncheckAllChecker(currentCheckBox) {
    if (!currentCheckBox.checked) {
        checkAllBox.checked = false;
    }
}

function removeLetters() {
    let openedLetters = document.body.querySelectorAll('.opened-letter');
    for (let i = 0; i < openedLetters.length; i++) {
        if (!openedLetters[i].classList.contains('non-displayed')) {
            return
        }
    }
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    for (let i = 1; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            let checkedLetter = checkBoxes[i];
            while (!checkedLetter.classList.contains('letters-section__letter-wrapper')) {
                checkedLetter = checkedLetter.parentNode;
            }
            checkedLetter.classList.add('letters-section__delete-letter-animation');
            checkedLetter.addEventListener('animationend', () => {
                checkedLetter.parentNode.removeChild(checkedLetter);
            });
        }
    }
    if (checkAllBox.checked) {
        checkAllBox.checked = false;
    }
}

function hideOtherLetters(currentReadableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentReadableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.add('non-displayed');
        } else {
            letterSection[i].querySelector('.opened-letter').classList.remove('non-displayed');
            letterSection[i].querySelector('.covered-letter').classList.add('non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.add('non-displayed');
        }
    }
}

function showOtherLetters(currentClosableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentClosableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.remove('non-displayed');
        } else {
            letterSection[i].querySelector('.opened-letter').classList.add('non-displayed');
            letterSection[i].querySelector('.covered-letter').classList.remove('non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.remove('non-displayed');
        }
    }
}

function getNewMessage() {
    let letterTemplate = `
                    <div class="opened-letter non-displayed">
                        <div class="opened-letter__closer" onclick="showOtherLetters(this)">×</div>
                        <div class="opened-letter__content main-content__distinguished">
                            <img class="opened-letter__york-image" src="images/york-img.png"
                                 alt="Йоркширский терьер" width="370" height="370">
                            Йоркширский терьер — небольшая собака, популярность которой значительно выросла в последние
                            несколько десятилетий. Скромный размер и кукольная внешность покорили миллионы сердец во
                            всем
                            мире,
                            и это неудивительно. Но за милой мордашкой скрывается настоящий охотник, жаждущий
                            приключений.
                            Несмотря на миниатюрный размер, йоркширский терьер обладает всеми качествами, которые
                            присущи
                            большим собакам: храбростью, любознательностью, преданностью и сообразительностью. Более
                            того,
                            это
                            очень своенравная порода собак. Сделать что-то исподтишка, погрызть провода, погнаться за
                            кошкой
                            —
                            все это можно ожидать от маленького питомца. Однако наличие в семье лидера и должная
                            дрессировка,
                            безусловно, помогут дисциплинировать проказника. Благодаря интеллекту и сообразительности
                            йорки
                            достаточно легко и быстро обучаются.
                            <br>
                            <br>
                            Йоркширские терьеры отлично ладят с детьми. Главное, чтобы ребенок понимал, что это
                            маленькая и
                            хрупкая собака, которую легко травмировать. Йорки без проблем уживаются с другими животными
                            в
                            квартире, однако нередко пытаются доминировать даже над более крупными соседями.
                        </div>
                    </div>
                    <div class="covered-letter">
                        <label class="covered-letter__checkbox-wrapper check-letter">
                            <input class="check-letter_visually-hidden" type="checkbox"
                                   onclick=uncheckAllChecker(this)>
                            <span class="check-letter__box"></span>
                        </label>
                        <div class="covered-letter__mini-logo-wrapper">
                            <img class="mini-sender-pic" src="images/ya-mini-logo.png"
                                 alt="Мини-лого отправителя - Яндекс">
                        </div>
                        <div class="covered-letter__click-to-open-wrapper covered-letter_not-read"
                             onclick=hideOtherLetters(this)>
                            <div class="sender-name covered-letter__item main-content__distinguished">
                                Команда Яндекс.Почты
                            </div>
                            <div class="is-read-mark_not-read covered-letter__item"></div>
                            <div class="title-text covered-letter__item main-content__distinguished">
                                Вы можете прочитать данное письмо.
                            </div>
                            <div class="date-info covered-letter__item main-content__distinguished">
                                6
                                авг
                            </div>
                        </div>
                    </div>
                    <div class="mail-box__hr-line"></div>
                </div>`;

    let lettersSection = document.querySelector('.letters-section');
    let newLetter = document.createElement('div');
    newLetter.classList.add('letters-section__letter-wrapper');
    newLetter.innerHTML = letterTemplate;
    newLetter.classList.add('letters-section__add-letter-animation');
    let openedLetter = document.body.querySelectorAll('.opened-letter');
    if (openedLetter.length !== 0) {
        for (let i = 0; i < openedLetter.length; i++) {
            if (!openedLetter[i].classList.contains('non-displayed')) {
                newLetter.classList.add('non-displayed');
            }
        }
    }
    lettersSection.insertBefore(newLetter, lettersSection.firstElementChild);
    newLetter.addEventListener('animationend', () => {
        newLetter.classList.remove('letters-section__add-letter-animation');
    });
    if (checkAllBox.checked) {
        checkAllBox.checked = false;
    }
}