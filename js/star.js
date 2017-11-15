$(function() {

  //등록된 평점이 없을때(리스트 목록 여부 체크)
   function noData(){
     if($('tbody tr').length==0){
     // if($('tbody').find('tr').index()==-1){
    $('tbody').append('<tr class="no_data"><td colspan="3" class="text_center">등록된 평점이 없습니다.</td></tr>');
   }
 }
  //등록된 평점이 없을때(리스트 목록 여부 체크)
    noData();

  //별점 체크시 바뀔 문구 작성
  var msg = [
    "완전 별로",
    "별로",
    "보통",
    "추천",
    "왕추천"
  ];

  $('.comment_write b').text(msg[4]);
  //별점체크
  $('.star_check a').on('click', function() {
    var index = $('.star_check a').index(this) + 1;
    var index2 = $(this).text();
    //console.log("몇번째 별: " + index + index2);

    //초기화
    $('.btn_star').removeClass('on');

    //선택한 별을 기준으로 on 클래스를 다시 붙임.
    // if(index==1){
    //   $('.btn_star').eq(0).addClass('on');
    // }else if(index==2){
    //   $('.btn_star').eq(0).addClass('on');
    //   $('.btn_star').eq(1).addClass('on');
    // }else if(index==3){
    //   $('.btn_star').eq(0).addClass('on');
    //   $('.btn_star').eq(1).addClass('on');
    //   $('.btn_star').eq(2).addClass('on');
    // }else if(index==4){
    //   $('.btn_star').eq(0).addClass('on');
    //   $('.btn_star').eq(1).addClass('on');
    //   $('.btn_star').eq(2).addClass('on');
    //   $('.btn_star').eq(3).addClass('on');
    // }else if(index==5){
    //   $('.btn_star').eq(0).addClass('on');
    //   $('.btn_star').eq(1).addClass('on');
    //   $('.btn_star').eq(2).addClass('on');
    //   $('.btn_star').eq(3).addClass('on');
    //   $('.btn_star').eq(4).addClass('on');
    // }
    //위코드 짧게 변경하기

    for(var i=0; i < index; i++){
  $('.btn_star').eq(i).addClass('on');
    }
    //input의 값 변경
    $('input[name=star]').val(index);
    //input select check textarea-> value
    //text() 텍스트만 가져오/ html 문자포함 태그 요소까지

    //메시지 바꾸기
    $('.star_check b').text(msg[index-1]);
  })
  //별점 체크 end

  //평점 등록하기
  $('#btn_commit').on('click',function(){

    $('.no_data').remove();

    //on되어진 별의 넓이 값
    var star = $('input[name=star]').val()*20;
    //console.log(star);
    //평점내용 가져오기
    var comment_text = $('#comment_text').val();
    //console.log(comment_text);

    var row='<tr>'
      +'<td>'
        +'<div class="star">'
          +'<em class="star'+star+'">'
            +'<span class="star_num">'+(star/10)+'</span>'
          +'</em>'
        +'</div>'
      +'</td>'
      +'<td>'+ comment_text +'</td>'
      +'<td>'
        +'<button class="btn_del btn_primary">삭제</button>'
      +'</td>'
    +'</tr>'

    if(comment_text != ''){
      $('tbody').prepend(row);
      //prepend()=> 선택한 요소의 자식요소를 앞쪽에 붙임
      //append()=> 선택한 요소의 자식요소를 뒤쪽에 붙임
    }else{
      alert('내용을 입력해주세요.');
    }


    //평점 내용 등록한 후 텍스트창 초기화, 포커스 텍스창에 발생
    $('#comment_text').val('').focus();
    $('.btn_star').addClass('on');//별5개 채우기
    $('.star_check b').text(msg[4]);//별5개 텍스트
    $('input[name=star]').val(5);//숨겨진 값
    total();
  })//평점 등록하기 end


  //평점 삭제(선택한 것만 삭제)
  //처음에는 없고 나중에 동적으로 요소를 추가한 경우 이벤트를 걸고 싶을때
  $('tbody').on('click','.btn_del',function(){
  //이미 요소가 있을 경우 사용
  // $('.btn_del').on('click',function(){

    //this => .btn_del을 가리킴
    // $(this).parent().parent().remove();
    $(this).parents('tr').remove();

    //tr이 하나라도 있으면 0, 하나도 없으면 -1
    console.log($('tbody').find('tr').index());

    total();
    //평점 리스트 체크
    noData();
  })

//전체삭제
$('#btn_all_del').on('click',function(){
   // $('tbody tr').remove();
   //해당 요소의 내용을 비워줌
   $('tbody').empty();
  //등록된 평점이 없을때(리스트 목록 여부 체크)
  total();
  noData();
})

//평점 계산
function total(){
  var total = 0;
  var count =$('tbody tr').length;

  for(var i = 0; i < count; i++){
    //Number() => 문자열을 연산처리를 위해 숫자로 변환
    total +=Number($('tbody tr').eq(i).find('.star_num').text());
  }

  // console.log('별점: ' + total +' 타입:'+ typeof total);
  //평점수
  $('#total').text(count);
  //평점
  if($('tbody tr').length!=0){
    $('#total_avg').text(Math.round(total/count));
  }else{
    $('#total_avg').text(0);
  }

}

})

//포커스 됬을때 엔터누르면 확인버튼 눌러지게 이벤트 넣을 수 있음
