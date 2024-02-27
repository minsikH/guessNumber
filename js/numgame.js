/* 
    1. 유저가 숫자를 입력
    2. 유저가 입력한 숫자와 랜덤 정답숫자와 비교해서 up/down/정답 이라는 피드백
    3. 유저 클릭할수 있는 기회 5번
       > 이미 입력, 방금입력한 숫자값 차감하지않음
    4. 유저가 입력 1~100 범위 밖의 숫자 입력경우 알려줌
       > 클릭기회 차감하지않음
    5. 게임종료 : 정답 / 5번기회 다쓴경우
       > 플레이버튼 비활성화
    6. reset버튼 : 처음부터시작
       > 랜덤숫자 새로생성 / ui 가 초기화되야함
*/

//랜덤번호
let computerNum = 0

//선택자변수
let $playButton = document.querySelector('#btnPlay') //play버튼
let $userInput = document.querySelector('#userInput') //input
let $resetButton = document.querySelector('#btnReset') //reset버튼
let $resultArea = document.querySelector('#result') //결과출력

//응시기회
let chances = 5;
let $chanceArea = document.querySelector('#chanceText')

let gameOver = false

//입력한 값을 누적해서 가지고 있을수 있는변수
let history = []

//play 버튼을 클릭
$playButton.addEventListener('click', play)//콜백함수

//reset 버튼을 클릭
$resetButton.addEventListener('click', reset)//콜백함수

$userInput.addEventListener('focus', function() {
    $userInput.value = ''
})

//랜덤번호 추천
function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1
    console.log(`정답 : ${computerNum}`)
}
pickRandomNum()

//플레이버튼이 클릭되면 실행되는 play 함수
function play() {
    //console.log('play')
    let userInputNum = $userInput.value
    //1~100사이를 벗어난 숫자를 입력하면 유저에게 알림 -> 응시기회 차감안됨
    //유저가입력한 값이 1보다 작거나 100보다 크면 결과창에 1과 100사이에 숫자를 입력해주세요 라는 문구를 보여줌 : return

    if (userInputNum < 1 || userInputNum > 100) {
        $resultArea.textContent = '1과 100사이의 숫자를 입력해주세요';
        return;
    }




    //유저가 입력한 값의 중복여부 - 데이터유효성
    if (history.includes(userInputNum))  {
        $resultArea.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력하세요.'
        return
    }


    //play 버튼을 누르면 클릭할때마다 chance가 1씩 감소
    chances--;
    //onsole.log(chances)
    $chanceArea.textContent = `남은기회 : ${chances}번`



    history.push(userInputNum)
    //console.log(history)

    //인풋에 입력된 값과 랜덤정답을 비교
    //인풋이 더크면 결과창에 'down' / 작으면 'up' / 정답이면 '정답입니다'


    if (userInputNum > computerNum) {
        $resultArea.textContent = 'Down'
    } else if (userInputNum < computerNum) {
        $resultArea.textContent = 'Up'
    } else {
        $resultArea.textContent = '정답입니다!👍'
    }

    //기회가 모두 소진되면 게임종료되면서 play 버튼 비활성화
    if (chances < 1) {
        gameOver = true
    }
    if (gameOver == true) {
        $playButton.disabled = true //버튼비활성화
        $playButton.classList.add('on')
    }
}



//리셋버튼
//결 과창 : 게임을 새로 시작합니다
//1) 유저입력창 비워지기
//2) 새 추첨번호 생성

function reset() {
    $resultArea.textContent = '새 게임이 시작됩니다.'
    $userInput.value = ''
    pickRandomNum()
    $chanceArea.textContent='남은기회 : 5회'
    $playButton.disabled = false //버튼비활성화
    $playButton.classList.remove('on')
    let history = []
}
reset()