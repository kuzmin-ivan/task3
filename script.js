function checkAll() {
    let checkAllBox = document.querySelector('#check-all-letters');
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    checkBoxes.forEach(
        checkBox => {
            checkBox.checked = checkAllBox.checked;
        }
    );
}

function uncheckAllChecker(currentCheckBox) {
    if (!currentCheckBox.checked) {
        document.getElementById('check-all-letters').checked = false;
    }
}

function removeLetters() {
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    for (let i = 1; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            let checkedLetter = checkBoxes[i];
            while (!checkedLetter.classList.contains('letters-section__letter-wrapper')) {
                checkedLetter = checkedLetter.parentNode;
            }
            checkedLetter.classList.add('letters-section__delete-letter');
            checkedLetter.addEventListener('animationend', () => {
                checkedLetter.parentNode.removeChild(checkedLetter);
            });
        }
    }
    if (checkBoxes[0].checked) {
        checkBoxes[0].checked = false;
    }
}

function hideOtherLetters(currentReadableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentReadableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.add('letter-body_non-displayed');
        } else {
            letterSection[i].querySelector('.letter-body_opened').classList.remove('letter-body_non-displayed');
            letterSection[i].querySelector('.letter-body_covered').classList.add('letter-body_non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.add('letter-body_non-displayed');
        }
    }
}

function showOtherLetters(currentClosableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentClosableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.remove('letter-body_non-displayed');
        } else {
            letterSection[i].querySelector('.letter-body_opened').classList.add('letter-body_non-displayed');
            letterSection[i].querySelector('.letter-body_covered').classList.remove('letter-body_non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.remove('letter-body_non-displayed');
        }
    }
}

function getNewMessage() {
    let letterTemplate = `
                    <div class="letter-body_opened letter-body_non-displayed">
                        <div class="letter-body_opened__close" onclick="showOtherLetters(this)">×</div>
                        <div class="letter-body_opened__content main-content__distinguished">
                            <img class="letter-body_opened__york-image" src="images/york-img.png"
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

                    <div class="letter-body_covered">
                        <label class="letter-body_covered__checkbox-wrapper check-letter">
                            <input class="check-letter_visually-hidden" type="checkbox"
                                   onclick=uncheckAllChecker(this)>
                            <span class="check-letter__box"></span>
                        </label>
                        <div class="letter-body_covered__mini-logo-wrapper">
                            <img class="mini-logo" src="images/ya-mini-logo.png"
                                 alt="Мини-лого отправителя - Яндекс">
                        </div>
                        <div class="letter-body_covered__click-to-open-wrapper is-read_not-read"
                             onclick=hideOtherLetters(this)>
                            <div class="sender-name letter-body_covered__item main-content__distinguished">
                                Команда Яндекс.Почты
                            </div>
                            <div class="is-read-mark is-read-mark_not-read letter-body_covered__item"></div>
                            <div class="title-text letter-body_covered__item main-content__distinguished">
                                Вы можете прочитать данное письмо.
                            </div>
                            <div class="date-info letter-body_covered__item main-content__distinguished">
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
    newLetter.classList.add('letters-section__add-letter');
    lettersSection.insertBefore(newLetter, lettersSection.firstElementChild);
    newLetter.addEventListener('animationend', () => {
        newLetter.classList.remove('letters-section__add-letter');
    });
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    if (checkBoxes[0].checked) {
        checkBoxes[0].checked = false;
    }
}