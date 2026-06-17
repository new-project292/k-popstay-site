// k-popstay 전용 언어 설정 — wehome.me 세션/쿠키와 완전 분리
// 쿠키 이름: kpop_locale (도메인: k-popstay.wehome.me 전용)
(function(){
  var COOKIE_NAME = 'kpop_locale';
  var SUPPORTED   = ['en','ko','ja','zh_t','zh_s','id'];
  var LABELS      = {
    en:   'EN',
    ko:   '한국어',
    ja:   '日本語',
    zh_t: '繁體中文',
    zh_s: '简体中文',
    id:   'Indonesia'
  };

  // 쿠키 읽기
  function getCookie(name){
    var m = document.cookie.match('(?:^|; )'+name+'=([^;]*)');
    return m ? decodeURIComponent(m[1]) : null;
  }

  // 쿠키 쓰기 (1년, 이 도메인 전용)
  function setCookie(name, val){
    var d = new Date();
    d.setFullYear(d.getFullYear()+1);
    document.cookie = name+'='+encodeURIComponent(val)
      +'; expires='+d.toUTCString()
      +'; path=/'
      +'; domain=k-popstay.wehome.me'
      +'; SameSite=Lax'
      +(location.protocol==='https:'?'; Secure':'');
  }

  // 현재 언어 감지: 쿠키 > Accept-Language > en
  function detectLang(){
    var c = getCookie(COOKIE_NAME);
    if(c && SUPPORTED.indexOf(c)>=0) return c;
    var al = (navigator.language||'').toLowerCase();
    if(al.indexOf('ja')===0) return 'ja';
    if(al.indexOf('zh-tw')===0||al.indexOf('zh-hant')===0) return 'zh_t';
    if(al.indexOf('zh')===0) return 'zh_s';
    if(al.indexOf('id')===0) return 'id';
    return 'en';
  }

  // 언어별 번역 데이터
  var T = {
    ko: {
      nav_home:'홈', nav_about:'K-POPSTAY', nav_guide:'게스트 가이드북', nav_apply:'보라해 챌린지 ›',
      hero_eyebrow:'K-POPSTAY BUSAN 2026',
      hero_title:'부산 갈매기<br><span class="brand">둥지</span>',
      hero_subtitle:'글로벌 팬들을 위한 부산 시민의 환대',
      hero_city:'부산 — 6월 12–14일',
      hero_cta:'보라해 챌린지 &amp; 후기 보러가기 ›',
      hero_share:'공유',
      hero_host:'부산 시민 호스트 신청하기 ›',
      hero_book:'위홈 부산 숙박 10% 할인 예약 ›',
      hero_homestay:'부산 시민 홈스테이 (위홈) ›',
      fab:'보라해 챌린지 &amp; 후기 보러가기 ›',
      intro_tag:'공정하고 상생하는 시민 참여형 거버넌스',
      intro_title:'부산 갈매기<br><span style="color:var(--purple)">둥지스테이</span>',
      intro_h3:'이 프로젝트에 대하여',
      intro_p:'K-POPSTAY BUSAN 2026은 BTS의 부산 콘서트를 맞아 전 세계 아미 팬들에게 부산 시민의 집을 무료로 제공하는 시민 참여형 공유숙박 프로젝트입니다.<br><br>바가지 요금 없이, 진짜 한국 가정의 따뜻한 환대를 경험하세요. 위홈이 검증한 신뢰할 수 있는 호스트와 함께합니다.',
      whatis_eyebrow:'K-POPSTAY BUSAN',
      whatis_title:'K-POPSTAY BUSAN이란?',
      card01_num:'01 · 신뢰', card01_title:'검증된 신뢰할 수 있는 호스트',
      card01_desc:'위홈이 직접 검증한 부산 시민 호스트와의 안전하고 신뢰 가득한 공유숙박 경험을 제공합니다. 모든 호스트는 사전 인증 절차를 통과한 검증된 분들입니다.',
      card02_num:'02 · 보증금', card02_title:'보증금 100% 전액 환급 시스템',
      card02_desc:'선정된 아미게스트는 1인 당 5만원의 보증금 지불을 해야합니다. 보증금은 체크인시 동일한 금액의 부산관광상품카드로 환불해드립니다. 부산관광상품카드는 부산시에서 현금처럼 사용이 가능합니다.',
      about_eyebrow:'About',
      about_title:'K-POP이 만드는<br>새로운 홈쉐어링',
      about_desc:'BTS의 2026 컴백 콘서트를 맞아 전 세계 팬들이 부산을 찾습니다. K-POPSTAY BUSAN은 이 특별한 순간을 문화 교류와 따뜻한 환대의 기회로 만듭니다.',
      about_g1_title:'게스트 혜택', about_g1_desc:'한국 아미 팬과 직접 교류하고, 진짜 K-라이프스타일을 체험하세요. 합법 인증 숙소에서 100% 무료 숙박을 제공합니다.',
      about_g2_title:'호스트 혜택', about_g2_desc:'전 세계 팬들과 교류하고, 위홈과 함께 공유숙박을 경험하세요. K-컬처 문화 대사로서 의미 있는 문화적 임팩트를 만들어갑니다.',
      about_g3_title:'사회적 가치', about_g3_desc:'바가지 요금 근절, K-라이프스타일 수요 충족, 지역경제 살리기. 공유숙박의 새로운 기준을 정립하는 사회적 모델입니다.',
      guide_eyebrow:'게스트 가이드북', guide_title:'알아야 할 모든 것',
      guide_link_title:'게스트 가이드북 읽기',
      guide_link_sub:'이용 규칙 · 보증금 정책 · 체크인 · 고객지원',
      guide_notice_title:'전제 사항',
      guide_notice_body:'본 가이드는 위홈 공유숙박 사용자 약관에 우선적으로 적용됩니다. 여기에서 언급되지 않은 사항은 위홈의 사용자 약관을 따릅니다.',
      guide_intro_html:'<p>K-POPSTAY BUSAN 2026은 부산 아미와 시민들의 참여를 바탕으로 부산시와 위홈이 진행합니다. 글로벌 아미와 부산의 아미 및 시민을 연결해서 숙박 문제를 다소라도 해결해 드리고 상호 교류를 돕기 위한 프로젝트입니다.</p><p>부산시도, 위홈도, 시민들도 모두 자발적인 참여로 진행됩니다. 특히 이번 K-POPSTAY BUSAN 2026은 부산의 아미와 시민이 자발적으로 나서서 글로벌 아미를 위해 아무런 대가 없이 기꺼이 숙소를 내어주는 것입니다.</p><p>촉박한 상황에서 적극적인 협조로 진행되는 만큼 아미 여러분의 협조와 호스트에 대한 감사, 그리고 존중의 자세가 필요합니다. 다소 부족한 점이 있을 수 있으니 너그러이 이해해 주시기 바랍니다.</p>',
      guide_label:'자격 및 숙박 정책', guide_h3:'예약 및 보증금',
      guide_cost:'게스트 비용: 0원',
      guide_p:'무료 숙박은 BTS 글로벌 아미에 우선 제공됩니다. 아미 확인이 불가한 경우 확약 후에도 취소될 수 있습니다. 보다 많은 아미에게 편의를 제공하기 위해 거실도 방으로 제공될 수 있으며, 시설 설명란에 명기됩니다.',
      guide_highlight:'<strong>보증금 — 1인당 5만원</strong><br>상호 신뢰를 위해 신용카드로 결제됩니다. 체크인 시 <strong>부산관광카드(5만원 충전)</strong>로 전액 환급됩니다. 부산 내 가맹점에서 현금처럼 사용 가능(백화점·대형 쇼핑몰 제외).<br><br>확약 후 노쇼의 경우 보증금은 환불되지 않습니다.<br><br>부산관광상품권 전달이 안되는 경우 숙박 후 보증금은 지불 취소로 자동 환급해드립니다.',
      guide_highlight2:'<strong>웰컴홈 기프트백</strong><br>선착순 100명 게스트에게 무료 제공. 부산시 및 제나벨(Genabelle) 후원.',
      guide2_h3:'이용 규칙 및 에티켓',
      guide_rule1:'<strong>금연</strong><br>숙소 내부 및 건물 내에서는 항상 흡연이 엄격히 금지됩니다.',
      guide_rule2:'<strong>취사 금지</strong><br>원칙적으로 주방 이용 및 조리 기구 사용은 불가합니다. (호스트가 문자로 허락한 경우에 한해 예외 가능)',
      guide_rule3:'<strong>음주 금지 및 소음 주의</strong><br>숙소 내 음주는 엄격히 금지되며, 이웃에게 피해를 줄 수 있는 소음이나 가무는 절대 삼가 주세요.',
      guide_rule4:'<strong>체크인·체크아웃</strong><br>시간은 호스트별로 다릅니다. 예약 후 직접 확인해 주세요. 일부 호스트는 6월 11일 조기 입실 가능.',
      guide_rule5:'<strong>공간 존중</strong><br>부산 시민이 실제 거주하는 공간입니다. 호스트의 사적인 공간이나 물건을 함부로 열거나 사용하지 마세요. 동숙 아미들과도 서로 배려해 주세요.',
      guide_rule6:'<strong>호스트 개인정보 보호</strong><br>호스트의 연락처 및 상세 숙소 정보는 외부에 유출하거나 SNS 등에 절대 공유해서는 안 됩니다.',
      guide_rule7:'<strong>규칙 위반 시 즉시 퇴실 조치될 수 있습니다.</strong>',
      guide_checkout_label:'체크아웃',
      guide_checkout_h3:'체크아웃 및 쓰레기 분리수거',
      guide_co1:'체크아웃 전 사용한 물건을 제자리에 두고 깨끗하게 정리해 주세요.',
      guide_co2:'<strong>쓰레기 분리수거는 필수입니다.</strong> 일반쓰레기, 재활용품(플라스틱·캔·유리·종이·비닐), 음식물 쓰레기를 분리해 주세요. 호스트가 별도 안내한 방법이 있다면 우선적으로 따라 주세요.',
      guide_co3:'세안 도구는 각자 챙겨오셔야 하며, 공연 후 숙소까지의 이동은 직접 하셔야 합니다.',
      guide_co4:'<strong>아미 챌린지:</strong> 호스트와 사진을 찍고 <strong>#보라해한글</strong> 해시태그로 SNS에 공유해 주세요.',
      guide_sup1:'<strong>채널톡 (가장 빠름)</strong>위홈 홈페이지 우측 하단 채팅 버튼',
      guide_sup2:'<strong>이메일 · 전화</strong>cs@wehome.me<br>1544-5665 (평일 10–18시)',
      guide_sup3:'<strong>긴급 · 기타 문의</strong>부산시민단체협의회: 051-809-2629<br>시청 경제정책과: 051-888-4751',
      perk1_title:'금연 (No Smoking)', perk1_desc:'실내 및 건물 내 어디서든 흡연은 엄격히 금지됩니다.',
      perk2_title:'취사 금지 (No Cooking)', perk2_desc:'숙박 기간 중 취사 및 주방 기구 사용은 허용되지 않습니다.',
      perk3_title:'체크인/체크아웃 — 호스트별 별도 지정', perk3_desc:'체크인·체크아웃 시간은 호스트마다 다릅니다. 예약 후 호스트에게 직접 확인해 주세요.',
      partners_eyebrow:'Partners &amp; Supporters', partners_title:'정부·기관과 함께합니다',
      sched_eyebrow:'Schedule', sched_title:'K-POPSTAY BUSAN 일정',
      sched_desc:'공식 게스트 프로그램 일정. <a href="/host">호스트 일정 보기 &rarr;</a>',
      tl1_date:'2026년 5월 29일', tl1_h4:'신청 접수 시작', tl1_p:'게스트 신청서 접수 시작 — 외국인 아미 팬 우선 선발', tl1_badge:'지금 진행 중',
      tl2_date:'2026년 6월 6–7일', tl2_h4:'게스트 선발 및 매칭 발표', tl2_p:'신청자 중 선발된 게스트 및 호스트 매칭 결과 발표',
      tl3_date:'2026년 6월 8일', tl3_h4:'매칭 결과 및 일정 안내', tl3_p:'매칭된 호스트/게스트에게 상세 숙박 일정 및 안내 사항 전달',
      tl4_date:'2026년 6월 12–14일 · 2박', tl4_h4:'숙박 진행 및 보증금 환급', tl4_p:'BTS 부산 콘서트 기간 숙박 진행 후 보증금 100% 전액 환급',
      contact_eyebrow:'문의하기', contact_title:'궁금한 점이 있으신가요?',
      contact1_h3:'채널톡', contact1_p:'실시간 채팅 상담을 통해 빠른 답변을 받아보세요.',
      contact2_h3:'이메일', contact2_p1:'<a href="mailto:cs@wehome.me">cs@wehome.me</a>', contact2_p2:'문의 후 영업일 기준 1~2일 내 답변',
      contact3_h3:'전화', contact3_p1:'<a href="tel:15445665">1544-5665</a>', contact3_p2:'평일 10:00–12:00, 13:00–18:00',
      footer_host:'호스트 신청',
      footer_cs:'고객센터',
      about_nav_apply:'신청하기 ›',
      about_hero_eyebrow:'K-POPSTAY 소개',
      about_hero_title:'K-POPSTAY',
      about_hero_sub:'K-POP이 만드는 새로운 홈쉐어링 — 전 세계 팬들과 현지 호스트를 연결해 특별한 경험을 만듭니다.',
      about_ov_eyebrow:'서비스 소개',
      about_ov_title:'K-POPSTAY란 무엇인가요?',
      about_ov_desc:'K-POPSTAY는 위홈이 만든 새로운 방식의 홈쉐어링 서비스로, 전 세계 K-POP 팬들과 현지 팬들을 연결해 숙소 문제를 해결하고 의미 있는 문화 교류의 장을 만듭니다.',
      about_ov_label1:'목적',
      about_ov_p1:'K-POPSTAY는 대형 K-POP 콘서트 시 발생하는 심각한 숙박난과 바가지 요금 문제를 해결하기 위해 만들어졌습니다. 현지 팬, 시민, 공유숙박 호스트, 지자체가 함께 공정한 대안을 제시합니다.',
      about_ov_label2:'위홈의 지원',
      about_ov_p2:'위홈은 집을 무료로 제공하는 호스트에게 플랫폼 서비스와 매칭을 무상으로 제공해, 호스트와 게스트 모두에게 진입 장벽 없는 경험을 보장합니다.',
      about_val_eyebrow:'핵심 가치',
      about_val_title:'게스트, 호스트, 사회를 위한 가치',
      about_val_desc:'K-POPSTAY는 단순한 숙박을 넘어 팬, 지역 사회, 사회 전반에 의미 있는 가치를 만들어냅니다.',
      about_val1_type:'게스트', about_val1_title:'글로벌 K-POP 팬을 위한 경험',
      about_val1_li1:'현지 팬들과 교류하며 BTS 고향의 K-라이프스타일을 직접 체험',
      about_val1_li2:'위홈이 보증하는 합법 인증 홈쉐어링의 높은 품질',
      about_val1_li3:'무료 또는 매우 저렴한 숙박비',
      about_val2_type:'호스트', about_val2_title:'호스트에게 특별한 기회',
      about_val2_li1:'전 세계 K-POP 팬들을 직접 만나고 교류하는 드문 기회',
      about_val2_li2:'법적 지원을 통해 홈쉐어링을 안전하게 시작(시범 사업)',
      about_val2_li3:'민간 문화 외교관으로서 K-라이프스타일 확산에 기여',
      about_val3_type:'사회', about_val3_title:'사회적 가치 창출',
      about_val3_li1:'커뮤니티 기반 대안으로 대형 행사 시 바가지 요금 근절',
      about_val3_li2:'글로벌 여행자의 진정한 K-라이프스타일 수요 충족',
      about_val3_li3:'기존 주거를 활용해 지역 주민에게 직접적인 경제적 혜택 환원',
      about_host_eyebrow:'호스트 참여',
      about_host_title:'누구나 호스트가 될 수 있습니다',
      about_host_desc:'콘서트 지역의 K-POP 팬, 지역 시민, 기존 위홈 호스트 모두 참여 가능합니다.',
      about_hcard1_badge:'팬 호스트', about_hcard1_title:'팬 호스트',
      about_hcard1_p:'글로벌 K-POP 팬을 환영하고 싶은 누구나 신청할 수 있습니다. 집을 무료로 제공하는 호스트는 별도의 공유숙박 등록이 필요하지 않습니다. 게스트가 일일 생활비를 납부하며, 이는 전액 호스트에게 정산됩니다.',
      about_hcard2_badge:'시민 호스트', about_hcard2_title:'시민 호스트',
      about_hcard2_p:'콘서트 개최 도시 거주민이라면 누구나 호스트로 참여할 수 있습니다. 홈쉐어링 경험이 없어도 위홈의 검증·지원 절차를 통해 안전하게 시작할 수 있습니다.',
      about_hcard3_badge:'특별 프로젝트', about_hcard3_title:'부산 갈매기 둥지 프로젝트',
      about_hcard3_p:'K-POPSTAY BUSAN 2026의 일환으로, 부산 시민들이 글로벌 K-POP 팬들에게 집을 무료로 개방합니다. 부산시와 공동 기획한 프로젝트입니다.',
      about_hcard4_badge:'기존 위홈 호스트', about_hcard4_title:'기존 위홈 호스트',
      about_hcard4_p:'이미 위홈에 등록된 호스트도 참여 가능합니다. 선발은 기존 리스팅 평점과 요금 정책을 고려하며, 홈쉐어링 시범 사업으로도 신청할 수 있습니다.',
      about_qualify_label:'참여 자격',
      about_qualify_p:'무료 숙박을 제공하는 팬 호스트 또는 위홈 홈쉐어링 시범 사업에 등록된 호스트가 신청 가능합니다. 기존 호스트는 리스팅 평가 및 요금 정책을 기준으로 선발됩니다.',
      about_proc_eyebrow:'진행 방식',
      about_proc_title:'매칭 프로세스',
      about_proc_desc:'신청부터 체크아웃까지 위홈이 모든 단계를 지원합니다.',
      about_step1_title:'호스트 신청 및 선발',
      about_step1_desc:'호스트가 신청하면 위홈이 서류 검토와 현장 방문을 통해 안전성, 청결도, 법적 적합성을 평가한 후 리스팅을 선발합니다.',
      about_step2_title:'게스트 신청',
      about_step2_desc:'게스트는 위홈 플랫폼을 통해 사전 신청하며, 선호하는 숙박 스타일과 날짜를 명시합니다.',
      about_step3_title:'매칭 및 선발',
      about_step3_desc:'호스트가 신청자 풀에서 직접 원하는 게스트를 선택할 수 있습니다.',
      about_step3_note:'위홈에 위임하는 경우 선착순 또는 추첨으로 매칭합니다.',
      about_step4_title:'팬 호스트 운영 규정',
      about_step4_desc:'무료로 공간을 제공하는 팬 호스트는 정식 공유숙박 사업자로 등록할 필요가 없습니다. 단, 게스트가 일일 생활비를 납부하며 이는 전액 호스트에게 정산됩니다.',
      about_step5_title:'시범 사업 및 요금 상한',
      about_step5_desc:'위홈은 비거주자 홈쉐어링 시범 사업 등록이 필요한 호스트에게 빠른 등록 지원을 제공합니다.',
      about_step5_note:'이 경우 요금은 전년 동기 유사 공유숙박 요금의 2배를 초과할 수 없습니다.',
      about_contact_eyebrow:'문의',
      about_contact_title:'궁금한 점이 있으신가요?',
      about_contact_desc:'호스트 신청이나 서비스 운영 방식에 대해 언제든지 문의해 주세요.',
      about_cc1_name:'실시간 채팅',
      about_cc1_val:'위홈 웹사이트를 통해 직접 채팅하세요',
      about_cc2_name:'전화',
      about_cc2_val:'1544-5665<br>평일 10:00–18:00 KST<br><span style="font-size:0.78rem;color:var(--text-300)">(점심 12:00–13:00 제외 / 주말·공휴일 휴무)</span>',
      about_back:'← 홈으로 돌아가기',
      apply_back:'← 뒤로',
      apply_eyebrow:'게스트 신청',
      apply_title:'무료 숙박 신청하기',
      apply_sub:'외국인 아미 우선. 6월 12–14일, 부산.',
      apply_form_h2:'게스트 신청서',
      apply_form_sub:'부산 콘서트 · 6월 12–14일, 2026 · Powered by Wehome',
      apply_step1:'숙박 조건', apply_step2:'개인 정보', apply_step3:'아미 인증',
      apply_sec1:'숙박 조건', apply_sec2:'개인 정보', apply_sec3:'아미 인증',
      apply_stay_type:'숙박 유형',
      apply_private_title:'개인실', apply_private_desc:'독립된 방',
      apply_shared_title:'쉐어룸', apply_shared_desc:'다른 게스트와 공유',
      apply_flex_title:'상관없음', apply_flex_desc:'선호 없음',
      apply_err_stay:'숙박 유형을 선택해 주세요.',
      apply_guest_count:'인원 수',
      apply_count_placeholder:'인원 수 선택',
      apply_count_1:'1명', apply_count_2:'2명', apply_count_3:'3명', apply_count_4:'4명',
      apply_err_count:'인원 수를 선택해 주세요.',
      apply_gender:'성별',
      apply_female:'여성', apply_male:'남성', apply_other:'기타',
      apply_err_gender:'성별을 선택해 주세요.',
      apply_bed:'침대 필요 여부',
      apply_bed_yes:'침대 필요', apply_bed_no:'바닥 가능',
      apply_err_bed:'침대 필요 여부를 선택해 주세요.',
      apply_checkin:'체크인 날짜', apply_checkout:'체크아웃 날짜',
      apply_date_placeholder:'날짜 선택',
      apply_date_note:'특별한 상황이 있는 경우 날짜를 조정할 수 있습니다.',
      apply_err_checkin:'체크인 날짜를 선택해 주세요.',
      apply_err_checkout:'체크아웃 날짜를 선택해 주세요.',
      apply_name:'이름', apply_name_placeholder:'이름 입력',
      apply_err_name:'이름을 입력해 주세요.',
      apply_nationality:'국적',
      apply_nationality_placeholder:'국적 선택',
      apply_err_nationality:'국적을 선택해 주세요.',
      apply_phone:'전화번호', apply_phone_placeholder:'전화번호 입력',
      apply_err_phone:'전화번호를 입력해 주세요.',
      apply_email:'이메일', apply_email_placeholder:'이메일 주소 입력',
      apply_err_email:'유효한 이메일을 입력해 주세요.',
      apply_languages:'소통 가능 언어',
      apply_err_language:'언어를 하나 이상 선택해 주세요.',
      apply_army_method:'아미 인증 방법',
      apply_weverse_title:'위버스', apply_weverse_desc:'위버스 멤버십 스크린샷',
      apply_ticket_title:'공연 티켓', apply_ticket_desc:'구매 확인서',
      apply_fanclub_title:'팬 커뮤니티', apply_fanclub_desc:'팬클럽/커뮤니티 게시물',
      apply_err_army:'아미 인증 방법을 선택해 주세요.',
      apply_upload:'인증 파일 업로드',
      apply_upload_click:'클릭하거나 파일을 드래그하여 업로드',
      apply_upload_size:'PNG, JPG, PDF — 최대 10MB',
      apply_err_file:'인증 파일을 업로드해 주세요.',
      apply_wehome_id:'위홈 아이디 (선택)',
      apply_wehome_placeholder:'위홈 계정 아이디 (선택 사항)',
      apply_comments:'추가 메모 (선택)',
      apply_comments_placeholder:'호스트에게 전하고 싶은 말이나 특별 요청 사항을 입력해 주세요.',
      apply_referral_label:'K-POPSTAY를 어떻게 알게 되셨나요?',
      apply_referral_theqoo:'더쿠 (Theqoo)', apply_referral_naver:'네이버 (블로그/카페)',
      apply_referral_visitkorea:'VisitKorea', apply_referral_fan_community:'팬 커뮤니티',
      apply_referral_friend:'지인 추천', apply_referral_baovanhoa:'Báo Văn Hóa (베트남)',
      apply_referral_kmmbox:'Korea.kr / KMMBOX',
      apply_deposit_title:'보증금 정책',
      apply_deposit_body:'선정된 아미게스트는 <strong>1인당 5만원</strong>의 보증금을 납부해야 합니다. 체크인 시 동일한 금액의 <strong>부산관광상품카드</strong>로 환급됩니다. 부산관광상품카드는 부산 전역 가맹점에서 현금처럼 사용 가능합니다.<br><br>부산관광상품권 전달이 안되는 경우 숙박 후 보증금은 지불 취소로 자동 환급해드립니다.',
      apply_agree_project:'본 신청서는 <strong>K-POPSTAY BUSAN 2026 부산 갈매기 둥지 프로젝트</strong>의 무료 숙박 신청서임을 확인하며, 선발 시 관련 안내 사항에 동의합니다.',
      apply_err_project:'위 내용에 동의해 주세요.',
      apply_agree_deposit:'<strong>5만원 보증금 정책</strong>을 이해하고 동의합니다. 체크인 시 부산관광상품카드로 전액 환급됨을 확인합니다.',
      apply_err_deposit:'보증금 정책에 동의해 주세요.',
      apply_agree_terms:'<a href="#" onclick="return false">이용약관</a> 및 <a href="#" onclick="return false">개인정보처리방침</a>에 동의합니다. 제출된 정보는 K-POPSTAY BUSAN 2026 호스트 매칭에 사용됩니다.',
      apply_err_agree:'약관에 동의해 주세요.',
      apply_btn_back:'← 이전', apply_btn_continue:'다음 →', apply_btn_submit:'신청 제출하기', apply_btn_submitting:'제출 중...',
      apply_success_title:'신청이 접수되었습니다!',
      apply_success_desc:'K-POPSTAY BUSAN 2026 게스트 신청서가 정상적으로 접수되었습니다.<br><strong>2026년 6월 6–7일</strong>까지 검토 후 이메일로 안내드립니다.<br><br>이메일로 확인서를 발송했습니다. 외국인 아미 팬 우선 선발입니다.',
      apply_closed_msg:'여러 아미 게스트 여러분의 부응에 감사합니다.<br>글로벌 아미 중심으로 선정해서 아미 호스트와 시민 호스트와 매칭해서 숙소 예약을 진행할 수 있도록 하겠습니다.<br>선정된 아미들에게는 이메일로 결과를 알려드리겠습니다.<br><br>아미 여러분의 성원에 감사드립니다.',
      apply_closed_title:'신청 마감',
      apply_closed_sub:'K-POPSTAY BUSAN 2026 · 감사합니다, ARMY!',
      ch_nav:'보라해 챌린지',
      ch_hero_eyebrow:'위홈 웰컴레터 & 보라해 한글 챌린지',
      ch_hero_title:'위홈 <span class="brand">웰컴레터</span><br>&amp; 부산 스테이<br>갤러리',
      ch_hero_p:'인스타그램에 K-POPSTAY 부산 순간을 공유해요 — 웰컴레터에 <strong>보라해</strong>를 쓰거나, 스테이 사진, 부산에서 호스트와 함께한 모든 것 OK!',
      ch_poster_eyebrow:'보라해 한글 챌린지',
      ch_poster_title:'나만의 한글 아트 만들기',
      ch_poster_desc:'호스트가 도착하면 <strong>위홈 보라해 한글 스티커 시트</strong>를 드립니다 — 내 이름, 좋아하는 BTS 멤버, 한국어로 원하는 단어 무엇이든 써보세요. 한국어 몰라도 됩니다!',
      ch_event_loc:'발리 아쿠아 랜드 · 6월 12–13일',
      ch_event_s1_title:'보따리 찾기',
      ch_event_s1_desc:'여성 락커를 확인하세요 — <em>보라해 한글 킷</em>이나 <em>위홈 선물 보따리</em>가 숨겨져 있다면 당신 것!',
      ch_event_s2_title:'한글 벽면 챌린지',
      ch_event_s2_desc:'스티커로 지정된 벽면에 이름이나 메시지를 붙여보세요.',
      ch_event_s3_title:'공유 &amp; 업로드',
      ch_event_s3_desc:'<button onclick="copyHashtag(\'#KPOPSTAYBusan\')" class="poster-hashtag-btn">#KPOPSTAYBusan</button> <button onclick="copyHashtag('#wehome')" class="poster-hashtag-btn">#wehome</button>으로 인스타에 올리고 갤러리에 등록해요!',
      ch_event_prizes_label:'상품:',
      ch_event_prize1:'보라해 한글 킷 × 8–9개',
      ch_event_prize2:'위홈 선물 보따리 × 2개',
      ch_gallery_eyebrow:'커뮤니티 갤러리',
      ch_gallery_title:'부산 스테이 갤러리',
      ch_gallery_desc:'전 세계 아미가 공유하는 K-POPSTAY 부산 순간 — 웰컴레터, 스테이 추억, 호스트와의 부산 여행.',
      ch_gallery_share:'내 게시물 공유',
      ch_gallery_counter_label:'부산에서 공유된 추억',
      ch_gallery_filter_all:'전체',
      ch_gallery_filter_insta:'SNS',
      ch_gallery_filter_upload:'사진 업로드',
      ch_gallery_loadmore:'더 보기 ›',
      ch_empty_title1:'나의 한글 아트',
      ch_empty_desc1:'스티커로 한국어 단어를 쓰고 사진을 찍어요',
      ch_empty_title2:'게시 &amp; 태그',
      ch_empty_desc2:'<strong style="color:var(--purple)">#KPOPSTAYBusan</strong>으로 인스타에 공유',
      ch_empty_title3:'갤러리 참여',
      ch_empty_desc3:'링크 제출 — 전 세계 아미가 볼 수 있는 갤러리에 게시됩니다',
      ch_empty_cta:'여기에 <strong>첫 번째 아미</strong>로 추억을 남겨주세요.<br>당신의 게시물이 모두가 처음 보는 것이 됩니다.',
      ch_modal_eyebrow:'이야기 공유',
      ch_modal_title:'게시물 제출',
      ch_modal_tab_insta:'인스타그램 링크',
      ch_modal_tab_upload:'사진 업로드',
      ch_modal_insta_sub:'인스타그램 게시글 링크를 붙여넣으세요 — 검토 후 갤러리에 표시됩니다!',
      ch_modal_insta_url_label:'인스타그램 게시글 URL',
      ch_modal_name_label:'이름 (선택)',
      ch_modal_name_ph:'예: ARMY_Korea',
      ch_modal_email_label:'이메일 (선택)',
      ch_modal_note_label:'호스트에게 메시지 (선택)',
      ch_modal_note_ph:'보라해! 집을 열어주셔서 감사합니다...',
      ch_modal_btn_insta:'게시물 제출 ›',
      ch_modal_upload_sub:'인스타그램이 없나요? 직접 사진을 올려요 — 한글 아트, 스테이 추억, 부산 순간 무엇이든!',
      ch_modal_photo_label:'사진',
      ch_modal_photo_up_to:'최대 5장',
      ch_modal_photo_tap:'<strong>사진 선택하기</strong>',
      ch_modal_photo_hint:'최대 5장 · JPG, PNG, WEBP, GIF · 장당 최대 10MB',
      ch_modal_caption_label:'캡션 (선택)',
      ch_modal_caption_ph:'보라해! 부산에서 만든 한글 아트예요...',
      ch_modal_upload_note_label:'호스트에게 메시지 (선택)',
      ch_modal_btn_upload:'업로드 &amp; 제출 ›',
      ch_alert_ok_title:'제출 완료',
      ch_alert_err_title:'오류',
      ch_alert_confirm:'확인',
      ch_msg_ok_insta:'제출 완료! 검토 후 갤러리에 표시됩니다.',
      ch_msg_ok_upload_photo:'사진 제출 완료! 검토 후 갤러리에 표시됩니다.',
      ch_msg_ok_upload_video:'동영상 제출 완료! 검토 후 갤러리에 표시됩니다.',
      ch_msg_err_no_photo:'사진을 선택해주세요.',
      ch_msg_err_no_video:'동영상 파일을 선택해주세요.',
      ch_msg_err_network:'네트워크 오류. 다시 시도해주세요.',
      ch_msg_err_dup:'이미 등록된 게시글입니다.',
      ch_msg_err_limit:'하루 제출 한도를 초과했습니다.',
      ch_msg_err_url:'올바른 인스타그램 URL이 아닙니다.',
      ch_msg_err_fail:'제출 실패. 잠시 후 다시 시도해주세요.',
      ch_reward_label:'스페셜 리워드',
      ch_reward_title:'우수 포스팅에 <span style="background:rgba(255,255,255,.2);border-radius:6px;padding:1px 8px">위홈 무료 숙박권</span> 증정',
      ch_reward_sub:'마음을 담은 한글 챌린지 사진/영상을 올려주세요!',
      ch_reward_btn:'지금 제출하기'
    },
    en: {
      nav_home:'HOME', nav_about:'K-POPSTAY', nav_guide:'Guest Guidebook', nav_apply:'Borahae Challenge ›',
      hero_eyebrow:'K-POPSTAY BUSAN 2026',
      hero_title:'<span class="brand">Busan Seagull</span><br>Nest',
      hero_subtitle:'A Purple Welcome for Global Fans,<br>Hosted by Busan Citizens.',
      hero_city:'Busan — Jun 12–14',
      hero_cta:'Go to Borahae Challenge &amp; Reviews ›',
      hero_share:'Share',
      hero_host:'Become a Busan Citizen Host ›',
      hero_book:'Book Wehome Busan Accommodations 10% Off ›',
      hero_homestay:'Busan Citizen Homestay on Wehome ›',
      fab:'Go to Borahae Challenge &amp; Reviews ›',
      intro_tag:'Fair &amp; Community-Driven Civic Governance',
      intro_title:'Busan Seagull<br>Nest',
      intro_h3:'About This Project',
      intro_p:'When BTS announced their 2026 Busan comeback concerts, accommodation prices in Busan surged to extraordinary levels — with some listings reaching 10x normal rates. This kind of price gouging leaves ordinary fans with no choice but to pay or give up on attending.<br><br>K-POPSTAY BUSAN is our answer: a civic initiative connecting ARMY fans with verified Busan citizen hosts who open their homes fairly, without exploiting the moment. Every stay is free of charge for guests, with a full deposit refund system to ensure trust on both sides.<br><br>This is not charity — it is community. Busan citizens stepping forward to say: <em>"You are welcome here."</em>',
      whatis_eyebrow:'K-POPSTAY BUSAN',
      whatis_title:'What is K-POPSTAY BUSAN?',
      card01_num:'01', card01_title:'Verified, Trustworthy Hosts',
      card01_desc:'Every host is a verified Busan citizen vetted through Wehome\'s platform. Guests can book with confidence knowing their host is genuine, accountable, and community-spirited.',
      card02_num:'02', card02_title:'100% Refundable Security Deposit',
      card02_desc:'Selected ARMY guests are required to pay a security deposit of KRW 50,000 per person. Upon check-in, the full deposit amount will be refunded in the form of a Busan Tourism Gift Card. The Busan Tourism Gift Card can be used like cash at participating businesses throughout Busan.',
      about_eyebrow:'About',
      about_title:'A New Kind of Home Sharing<br>Powered by K-POP',
      about_desc:'BTS\'s 2026 comeback concerts in Busan have inspired tens of thousands of fans worldwide to travel to Korea. K-POPSTAY is a first-of-its-kind civic program that turns fan passion into a community movement.',
      about_g1_title:'For Guests', about_g1_desc:'International ARMY get a safe, verified, free place to stay during the concerts — hosted by a real Busan citizen who wants to share their city and culture.',
      about_g2_title:'For Hosts', about_g2_desc:'Busan residents share their home, meet a global fan, and contribute to a community movement. Hosts receive recognition and support through Wehome\'s platform.',
      about_g3_title:'For Society', about_g3_desc:'A new model for event tourism — one that prioritizes fairness, community, and cultural exchange over profit. A blueprint for future K-POP events worldwide.',
      guide_eyebrow:'Guest Guidebook', guide_title:'Everything You Need to Know',
      guide_link_title:'Read the Guest Guidebook',
      guide_link_sub:'House rules · Deposit policy · Check-in · Support',
      guide_label:'K-POPSTAY Busan Policy', guide_h3:'Stay Costs &amp; Deposit Policy',
      guide_cost:'Guest Cost: KRW 0',
      guide_p:'Your stay is completely free of charge. K-POPSTAY BUSAN is a civic initiative — Busan citizen hosts voluntarily open their homes to global ARMY at no cost.',
      guide_highlight:'Refundable Security Deposit: A small deposit is collected at booking to ensure mutual commitment. It is 100% refunded upon checkout with no conditions.<br><br>If we are unable to provide the Busan Tourism Gift Card, your deposit will be automatically refunded to your original payment method after your stay.',
      guide2_h3:'House Rules',
      perk1_title:'No Smoking — 금연', perk1_desc:'Smoking is strictly prohibited inside the home and on the premises at all times.',
      perk2_title:'No Cooking — 취사 금지', perk2_desc:'Cooking and use of kitchen appliances are not permitted during your stay.',
      perk3_title:'Check-in &amp; Check-out Times — 호스트별 별도 지정', perk3_desc:'Check-in and check-out times are set individually by each host. Please confirm the exact times with your host after booking.',
      partners_eyebrow:'Partners &amp; Supporters', partners_title:'Backed by Government &amp; Industry',
      sched_eyebrow:'Schedule', sched_title:'K-POPSTAY BUSAN Timeline',
      sched_desc:'Official guest program schedule. <a href="/host">View host schedule &rarr;</a>',
      tl1_date:'May 29 2026', tl1_h4:'Application Opens', tl1_p:'Guest applications officially open. Priority given to international ARMY.', tl1_badge:'Now Open',
      tl2_date:'Jun 6–7 2026', tl2_h4:'Guest Selection &amp; Match Announcement', tl2_p:'Selected guests are notified and matched with a verified Busan citizen host.',
      tl3_date:'Jun 8 2026', tl3_h4:'Match Results &amp; Itinerary Delivery', tl3_p:'Full stay details, host introduction, and itinerary delivered to confirmed guests.',
      tl4_date:'Jun 12–14 2026 · 2 nights', tl4_h4:'Stay Period &amp; Deposit Refund', tl4_p:'Guests stay with their Busan host family during the concert period. Full deposit refunded at checkout.',
      contact_eyebrow:'Contact Us', contact_title:'Get in Touch',
      contact1_h3:'Channel Talk', contact1_p:'Chat with our support team in real-time through Channel Talk — fastest response.',
      contact2_h3:'Email', contact2_p1:'<a href="mailto:cs@wehome.me">cs@wehome.me</a>', contact2_p2:'We respond within 1 business day.',
      contact3_h3:'Phone', contact3_p1:'<a href="tel:15445665">1544-5665</a>', contact3_p2:'Weekdays 10:00–12:00, 13:00–18:00',
      footer_host:'Host Application',
      footer_cs:'Customer Support',
      about_nav_apply:'Apply Now ›',
      about_hero_eyebrow:'About K-POPSTAY',
      about_hero_title:'K-POPSTAY',
      about_hero_sub:'A new kind of home sharing powered by K-POP — connecting fans from around the world with local hosts for a truly special stay.',
      about_ov_eyebrow:'About the Service',
      about_ov_title:'What is K-POPSTAY?',
      about_ov_desc:'K-POPSTAY is a new kind of home sharing service by Wehome that connects global K-POP fans with local fans, solving accommodation challenges while creating meaningful cultural exchanges.',
      about_ov_label1:'Purpose',
      about_ov_p1:'K-POPSTAY was created to address the critical shortage of accommodation and price gouging that occurs during major K-POP concerts. Local fans, ordinary citizens, home sharing hosts, and local governments come together to provide a fair and community-driven alternative.',
      about_ov_label2:"Wehome's Support",
      about_ov_p2:"Wehome provides all platform services and matching at no cost for hosts who offer their homes for free — ensuring a zero-barrier experience for both hosts and guests.",
      about_val_eyebrow:'Core Values',
      about_val_title:'Value for Guests, Hosts, and Society',
      about_val_desc:'K-POPSTAY goes beyond accommodation — it creates meaningful value for fans, local communities, and society at large.',
      about_val1_type:'Guest', about_val1_title:'An Experience for Global K-POP Fans',
      about_val1_li1:"Meet local fans and experience the K-lifestyle of BTS's hometown",
      about_val1_li2:"Quality, legally-verified home sharing guaranteed by Wehome",
      about_val1_li3:'Free or highly affordable accommodation costs',
      about_val2_type:'Host', about_val2_title:'A Special Opportunity for Hosts',
      about_val2_li1:'A rare chance to meet and connect with global K-POP fans in person',
      about_val2_li2:'Start home sharing safely with legal support (pilot program)',
      about_val2_li3:'Contribute to spreading K-Lifestyle as a people-to-people cultural ambassador',
      about_val3_type:'Social', about_val3_title:'Creating Social Value',
      about_val3_li1:'Tackling price gouging at major events through community-driven alternatives',
      about_val3_li2:"Fulfilling global travelers' demand for authentic K-Lifestyle experiences",
      about_val3_li3:'Returning direct economic benefit to local residents while utilizing existing housing',
      about_host_eyebrow:'Host Participation',
      about_host_title:'Anyone Can Become a Host',
      about_host_desc:'K-POP fans, local citizens, and existing Wehome hosts in the concert area are all welcome to participate.',
      about_hcard1_badge:'Fan Host', about_hcard1_title:'Fan Host',
      about_hcard1_p:"Any fan who wants to welcome global K-POP fans can apply. Hosts who provide their home for free do not require a separate home sharing registration. Guests pay a daily cost-of-living fee, which is fully settled to the host.",
      about_hcard2_badge:'Citizen Host', about_hcard2_title:'Citizen Host',
      about_hcard2_p:"Any resident of the concert city can participate as a host. Even without prior home sharing experience, Wehome's verification and support process ensures a safe and smooth start.",
      about_hcard3_badge:'Special Project', about_hcard3_title:'Busan Seagull Nest Project',
      about_hcard3_p:'As part of K-POPSTAY BUSAN 2026, Busan citizens open their homes to global K-POP fans free of charge — a project co-developed with the City of Busan.',
      about_hcard4_badge:'Existing Wehome Host', about_hcard4_title:'Existing Wehome Host',
      about_hcard4_p:"Hosts already registered on Wehome are also eligible to participate. Selection considers existing listing ratings and pricing policies, and hosts may apply under the home sharing pilot program.",
      about_qualify_label:'Eligibility',
      about_qualify_p:"Applications are open to fan hosts offering free accommodation, or hosts registered under Wehome's home sharing pilot program. Existing hosts are selected based on listing evaluations and pricing policy.",
      about_proc_eyebrow:'How It Works',
      about_proc_title:'The Matching Process',
      about_proc_desc:'From application to checkout, Wehome supports every step of the way.',
      about_step1_title:'Host Application & Selection',
      about_step1_desc:'Once a host applies, Wehome reviews documents and conducts an on-site visit to evaluate safety, cleanliness, and legal compliance before selecting the listing.',
      about_step2_title:'Guest Application',
      about_step2_desc:"Guests apply in advance through the Wehome platform, specifying their preferred accommodation style and dates.",
      about_step3_title:'Matching & Selection',
      about_step3_desc:"Hosts can directly choose which guest they'd like to welcome from the pool of applicants.",
      about_step3_note:'If delegated to Wehome, matching is done on a first-come, first-served basis or by lottery.',
      about_step4_title:'Fan Host Operating Rules',
      about_step4_desc:'Fan hosts who offer their space for free are not required to register as a formal home sharing business. However, guests must pay a daily cost-of-living fee, which is fully remitted to the host.',
      about_step5_title:'Pilot Program & Rate Cap',
      about_step5_desc:'Wehome provides fast-track registration support for hosts who require enrollment in the non-resident home sharing pilot program.',
      about_step5_note:'In this case, rates are capped at no more than 2× the comparable home sharing rate from the same period in the prior year.',
      about_contact_eyebrow:'Contact',
      about_contact_title:'Have Questions?',
      about_contact_desc:'Feel free to reach out anytime about host applications or how the service works.',
      about_cc1_name:'Live Chat',
      about_cc1_val:'Chat with us directly via the Wehome website',
      about_cc2_name:'Phone',
      about_cc2_val:'1544-5665<br>Mon–Fri 10:00–18:00 KST<br><span style="font-size:0.78rem;color:var(--text-300)">(Excl. lunch 12:00–13:00 / Closed weekends & holidays)</span>',
      about_back:'← Back to Home',
      apply_back:'← Back',
      apply_eyebrow:'GUEST APPLICATION',
      apply_title:'Apply for a Free Stay',
      apply_sub:'Priority for international ARMY. Jun 12–14, Busan.',
      apply_form_h2:'Guest Application Form',
      apply_form_sub:'Busan Concert · Jun 12–14, 2026 · Powered by Wehome',
      apply_step1:'Stay Preferences', apply_step2:'Personal Info', apply_step3:'ARMY Verification',
      apply_sec1:'Stay Preferences', apply_sec2:'Personal Info', apply_sec3:'ARMY Verification',
      apply_stay_type:'Accommodation Type',
      apply_private_title:'Private Room', apply_private_desc:'Independent room',
      apply_shared_title:'Shared Room', apply_shared_desc:'Share with guests',
      apply_flex_title:'Flexible', apply_flex_desc:'No preference',
      apply_err_stay:'Please select accommodation type.',
      apply_guest_count:'Number of Guests',
      apply_count_placeholder:'Select number of guests',
      apply_count_1:'1 person', apply_count_2:'2 persons', apply_count_3:'3 persons', apply_count_4:'4 persons',
      apply_err_count:'Please select number of guests.',
      apply_gender:'Gender',
      apply_female:'Female', apply_male:'Male', apply_other:'Other',
      apply_err_gender:'Please select gender.',
      apply_bed:'Individual Bed Required?',
      apply_bed_yes:'Yes', apply_bed_no:'No',
      apply_err_bed:'Please select bed preference.',
      apply_checkin:'Check-in Date', apply_checkout:'Check-out Date',
      apply_date_placeholder:'Select date',
      apply_date_note:'If you have special circumstances, you may adjust the dates.',
      apply_err_checkin:'Please select check-in date.',
      apply_err_checkout:'Please select check-out date.',
      apply_name:'Full Name', apply_name_placeholder:'Your full name',
      apply_err_name:'Please enter your name.',
      apply_nationality:'Country/Region',
      apply_nationality_placeholder:'Select Country/Region',
      apply_err_nationality:'Please select nationality.',
      apply_phone:'Phone Number', apply_phone_placeholder:'Phone number',
      apply_err_phone:'Please enter phone number.',
      apply_email:'Email Address', apply_email_placeholder:'your@email.com',
      apply_err_email:'Please enter a valid email.',
      apply_languages:'Preferred Language(s)',
      apply_err_language:'Please select at least one language.',
      apply_army_method:'ARMY Proof Method',
      apply_weverse_title:'Weverse', apply_weverse_desc:'Weverse membership screenshot',
      apply_ticket_title:'Concert Ticket', apply_ticket_desc:'Purchase confirmation',
      apply_fanclub_title:'Fan Community', apply_fanclub_desc:'Fan club / community post',
      apply_err_army:'Please select proof method.',
      apply_upload:'Upload Proof File',
      apply_upload_click:'Click to upload or drag & drop',
      apply_upload_size:'PNG, JPG, PDF — max 10MB',
      apply_err_file:'Please upload proof file.',
      apply_wehome_id:'Wehome ID (optional)',
      apply_wehome_placeholder:'Your Wehome account ID (if any)',
      apply_comments:'Additional Comments (optional)',
      apply_comments_placeholder:'Any special requests, accessibility needs, or messages to your host...',
      apply_referral_label:'How did you hear about K-POPSTAY?',
      apply_referral_theqoo:'더쿠 (Theqoo)', apply_referral_naver:'Naver (Blog/Cafe)',
      apply_referral_visitkorea:'VisitKorea', apply_referral_fan_community:'Fan Community',
      apply_referral_friend:'Friend / Word of Mouth', apply_referral_baovanhoa:'Báo Văn Hóa (Vietnam)',
      apply_referral_kmmbox:'Korea.kr / KMMBOX',
      apply_deposit_title:'Security Deposit Policy',
      apply_deposit_body:'Selected ARMY guests are required to pay a security deposit of <strong>KRW 50,000 per person</strong>. Upon check-in, the full deposit amount will be refunded in the form of a <strong>Busan Tourism Gift Card</strong>. The Busan Tourism Gift Card can be used like cash at participating businesses throughout Busan.<br><br>If we are unable to provide the Busan Tourism Gift Card, your deposit will be automatically refunded to your original payment method after your stay.',
      apply_agree_project:'I hereby confirm that this is an application form for free accommodation provided through the <strong>Busan Seagull Nest Project of K-POPSTAY BUSAN 2026</strong>. Should my application be accepted, I understand and agree to the following.',
      apply_err_project:'Please confirm the above statement.',
      apply_agree_deposit:'I understand and agree to the <strong>KRW 50,000 security deposit policy</strong>. I acknowledge that the deposit will be fully refunded as a Busan Tourism Gift Card upon check-in.',
      apply_err_deposit:'Please agree to the deposit policy.',
      apply_agree_terms:'I agree to the <a href="#" onclick="return false">Terms of Service</a> and <a href="#" onclick="return false">Privacy Policy</a>. I understand that my information will be used to match me with a verified Busan host for the K-POPSTAY BUSAN 2026 program.',
      apply_err_agree:'Please agree to the terms.',
      apply_btn_back:'← Back', apply_btn_continue:'Continue →', apply_btn_submit:'Submit Application', apply_btn_submitting:'Submitting...',
      apply_success_title:'Application Submitted!',
      apply_success_desc:'Thank you for applying to K-POPSTAY BUSAN 2026.<br>We will review your application and notify you.<br><br>Check your email for confirmation. Priority is given to international ARMY.',
      apply_closed_msg:'Thank you so much for the overwhelming response from ARMY guests around the world.<br>We will be selecting global ARMY and matching them with ARMY hosts and citizen hosts to arrange accommodation.<br>Selected ARMY members will be notified of the results by email.<br><br>Thank you for your enthusiastic support, ARMY!',
      apply_closed_title:'Applications Closed',
      apply_closed_sub:'K-POPSTAY BUSAN 2026 · Thank you, ARMY!',
      ch_nav:'Borahae Challenge',
      ch_hero_eyebrow:'위홈 웰컴레터 & 보라해 한글 챌린지',
      ch_hero_title:'Wehome <span class="brand">Welcome Letter</span><br>&amp; Busan Stay<br>Gallery',
      ch_hero_p:'Share your K-POPSTAY Busan moments on Instagram — write <strong>보라해</strong> on your Welcome Letter, snap your stay, capture Busan with your host, anything goes!',
      ch_poster_eyebrow:'Borahae Hangul Challenge',
      ch_poster_title:'Make Your Own Hangul Art',
      ch_poster_desc:'Your host will give you the <strong>Wehome Borahae Hangul sticker sheet</strong> when you arrive — use it to write your name, your favorite BTS member, or any Korean word you love. No Korean skills needed!',
      ch_event_loc:'Bally Aqua Land · Jun 12–13',
      ch_event_s1_title:'Find the Botari',
      ch_event_s1_desc:'Check women\'s lockers — find a <em>Borahae Hangul Kit</em> or <em>Wehome Gift Botari</em> hidden inside and it\'s yours!',
      ch_event_s2_title:'Hangul Wall Challenge',
      ch_event_s2_desc:'Use the stickers to spell your name or a message on the designated wall in the aqua land.',
      ch_event_s3_title:'Share &amp; Upload',
      ch_event_s3_desc:'Post your creation on Instagram with <button onclick="copyHashtag(\'#KPOPSTAYBusan\')" class="poster-hashtag-btn">#KPOPSTAYBusan</button> <button onclick="copyHashtag('#wehome')" class="poster-hashtag-btn">#wehome</button>, then submit it to this gallery!',
      ch_event_prizes_label:'Prizes:',
      ch_event_prize1:'Borahae Hangul Kit × 8–9',
      ch_event_prize2:'Wehome Gift Botari × 2',
      ch_gallery_eyebrow:'Community Gallery',
      ch_gallery_title:'Busan Stay Gallery',
      ch_gallery_desc:'ARMY from around the world sharing their K-POPSTAY Busan moments — Welcome Letters, stay memories, and Busan adventures with their hosts.',
      ch_gallery_share:'Share My Post',
      ch_gallery_counter_label:'memories shared from Busan',
      ch_gallery_filter_all:'All',
      ch_gallery_filter_insta:'SNS',
      ch_gallery_filter_upload:'Photo Upload',
      ch_gallery_loadmore:'Load More ›',
      ch_empty_title1:'Your Hangul Art',
      ch_empty_desc1:'Write any Korean word with the stickers and snap a photo',
      ch_empty_title2:'Post &amp; Tag',
      ch_empty_desc2:'Share on Instagram with <strong style="color:var(--purple)">#KPOPSTAYBusan</strong>',
      ch_empty_title3:'Join the Gallery',
      ch_empty_desc3:'Submit your link — your post appears here for ARMY worldwide',
      ch_empty_cta:'Be the <strong>first ARMY</strong> to leave a memory here.<br>Your post will be the one everyone sees first.',
      ch_modal_eyebrow:'Share Your Story',
      ch_modal_title:'Submit Your Post',
      ch_modal_tab_insta:'Instagram Link',
      ch_modal_tab_upload:'Upload Photo',
      ch_modal_insta_sub:'Paste your Instagram post link — after a quick review it\'ll appear in the gallery!',
      ch_modal_insta_url_label:'Instagram Post URL',
      ch_modal_name_label:'Your Name (optional)',
      ch_modal_name_ph:'e.g. ARMY_USA',
      ch_modal_email_label:'Email (optional)',
      ch_modal_note_label:'Message to your host (optional)',
      ch_modal_note_ph:'보라해! Thank you for opening your home...',
      ch_modal_btn_insta:'Submit My Post ›',
      ch_modal_upload_sub:'No Instagram? Upload your photo directly — Hangul art, stay memories, Busan moments, anything!',
      ch_modal_photo_label:'Photos',
      ch_modal_photo_up_to:'up to 5 photos',
      ch_modal_photo_tap:'<strong>Tap to choose photos</strong>',
      ch_modal_photo_hint:'Up to 5 photos · JPG, PNG, WEBP, GIF · max 10MB each',
      ch_modal_caption_label:'Caption (optional)',
      ch_modal_caption_ph:'보라해! Here\'s my Hangul art from Busan...',
      ch_modal_upload_note_label:'Message to your host (optional)',
      ch_modal_btn_upload:'Upload &amp; Submit ›',
      ch_alert_ok_title:'Submitted!',
      ch_alert_err_title:'Error',
      ch_alert_confirm:'OK',
      ch_msg_ok_insta:'Submitted! Your post will appear after review.',
      ch_msg_ok_upload_photo:'Photos submitted! Your post will appear after review.',
      ch_msg_ok_upload_video:'Video submitted! Your post will appear after review.',
      ch_msg_err_no_photo:'Please select at least one photo.',
      ch_msg_err_no_video:'Please select a video.',
      ch_msg_err_network:'Network error. Please try again.',
      ch_msg_err_dup:'This post has already been submitted.',
      ch_msg_err_limit:'Daily submission limit reached.',
      ch_msg_err_url:'Please enter a valid Instagram URL.',
      ch_msg_err_fail:'Submission failed. Please try again.',
      ch_reward_label:'Special Reward',
      ch_reward_title:'Best posts win a <span style="background:rgba(255,255,255,.2);border-radius:6px;padding:1px 8px">FREE Wehome stay</span>',
      ch_reward_sub:'Share your K-POPSTAY memory — best posts win a free Wehome night!',
      ch_reward_btn:'Submit Now'
    },
    ja: {
      nav_home:'HOME', nav_about:'K-POPSTAY', nav_guide:'ゲストガイドブック', nav_apply:'ボラヘチャレンジ ›',
      hero_eyebrow:'K-POPSTAY BUSAN 2026',
      hero_title:'<span class="brand">釜山シーガル</span><br>ネスト',
      hero_subtitle:'世界中のファンへ、紫のおもてなし。<br>釜山市民がホストとして歓迎します。',
      hero_city:'釜山 — 6月12–14日',
      hero_cta:'ボラヘチャレンジ &amp; レビューへ ›',
      hero_share:'シェア',
      hero_host:'釜山市民ホストになる ›',
      hero_book:'Wehome釜山宿泊を10%割引で予約 ›',
      hero_homestay:'釜山市民ホームステイ (Wehome) ›',
      fab:'ボラヘチャレンジ &amp; レビューへ ›',
      intro_tag:'公正でコミュニティ主導の市民ガバナンス',
      intro_title:'釜山シーガル<br>ネスト',
      intro_h3:'このプロジェクトについて',
      intro_p:'BTSが2026年釜山カムバックコンサートを発表すると、釜山の宿泊料金は急騰し、一部では通常の10倍に達しました。このような価格つり上げは、普通のファンが参加をあきらめるか、高額を支払うかの選択を迫られます。<br><br>K-POPSTAY BUSANはその答えです。ARMYファンと、公平に自宅を開放する釜山市民ホストをつなぐ市民イニシアチブです。ゲストの宿泊費は無料で、双方の信頼を確保するための全額デポジット返還システムを導入しています。<br><br>これは慈善活動ではなく、コミュニティです。釜山市民が前に出て言います：<em>「ようこそ、ここはあなたの家です。」</em>',
      whatis_eyebrow:'K-POPSTAY BUSAN',
      whatis_title:'K-POPSTAY BUSANとは？',
      card01_num:'01', card01_title:'認証済み信頼できるホスト',
      card01_desc:'すべてのホストはWehomeのプラットフォームを通じて認証された釜山市民です。ゲストは安心してホストが本物であり、責任感があり、コミュニティ精神にあふれていることを確認できます。',
      card02_num:'02', card02_title:'100%返金可能なセキュリティデポジット',
      card02_desc:'選ばれたARMYゲストは1人あたり50,000ウォンのセキュリティデポジットをお支払いいただきます。チェックイン時に、デポジット全額が釜山観光ギフトカードの形で返金されます。釜山観光ギフトカードは釜山全域の加盟店で現金のようにご利用いただけます。',
      about_eyebrow:'About',
      about_title:'K-POPが生み出す<br>新しいホームシェアリング',
      about_desc:'BTSの2026年釜山カムバックコンサートは、世界中の数万人のファンが韓国への旅行を決意するきっかけとなりました。K-POPSTAYは、ファンの情熱をコミュニティムーブメントへと変える前例のない市民プログラムです。',
      about_g1_title:'ゲストの方へ', about_g1_desc:'海外ARMYは、コンサート期間中に安全で認証された無料の宿泊場所を確保できます — 自分の街と文化を分かち合いたい本物の釜山市民がホストです。',
      about_g2_title:'ホストの方へ', about_g2_desc:'釜山在住者が自宅を共有し、世界中のファンと交流し、コミュニティムーブメントに貢献します。ホストはWehomeのプラットフォームを通じて認定とサポートを受けます。',
      about_g3_title:'社会のために', about_g3_desc:'利益よりも公平性、コミュニティ、文化交流を優先するイベント観光の新しいモデル。世界中の将来のK-POPイベントの青写真です。',
      guide_eyebrow:'ゲストガイドブック', guide_title:'知っておくべきすべてのこと',
      guide_link_title:'ゲストガイドブックを読む',
      guide_link_sub:'ハウスルール · デポジット · チェックイン · サポート',
      guide_label:'K-POPSTAY 釜山ポリシー', guide_h3:'宿泊費用とデポジットポリシー',
      guide_cost:'ゲスト費用：0ウォン',
      guide_p:'宿泊は完全無料です。K-POPSTAY BUSANは市民イニシアチブです — 釜山市民ホストが世界のARMYに無償で自宅を開放します。',
      guide_highlight:'返金可能なセキュリティデポジット：予約時に相互コミットメントを確保するため、少額のデポジットを収集します。チェックアウト時に条件なしで100%返金されます。<br><br>釜山観光ギフトカードのご提供ができない場合、ご宿泊後に保証金は元のお支払い方法に自動的に返金されます。',
      guide2_h3:'ハウスルール',
      perk1_title:'禁煙 — 금연', perk1_desc:'室内および敷地内での喫煙は一切禁止されています。',
      perk2_title:'調理禁止 — 취사 금지', perk2_desc:'滞在中の調理および調理器具の使用は禁止されています。',
      perk3_title:'チェックイン・アウト — 호스트별 별도 지정', perk3_desc:'チェックインとチェックアウトの時間はホストによって異なります。予約後にホストへご確認ください。',
      partners_eyebrow:'パートナー &amp; サポーター', partners_title:'政府と産業界に支援されています',
      sched_eyebrow:'スケジュール', sched_title:'K-POPSTAY BUSAN タイムライン',
      sched_desc:'ゲストプログラムの公式スケジュール。<a href="/host">ホストスケジュールを見る &rarr;</a>',
      tl1_date:'2026年5月29日', tl1_h4:'申し込み開始', tl1_p:'ゲスト申し込みが正式に開始。海外ARMYを優先します。', tl1_badge:'受付中',
      tl2_date:'2026年6月6〜7日', tl2_h4:'ゲスト選考 &amp; マッチング発表', tl2_p:'選ばれたゲストに通知が届き、認証済み釜山市民ホストとマッチングされます。',
      tl3_date:'2026年6月8日', tl3_h4:'マッチング結果 &amp; 日程案内', tl3_p:'確定したゲストに宿泊詳細、ホスト紹介、スケジュールが届きます。',
      tl4_date:'2026年6月12〜14日 · 2泊', tl4_h4:'宿泊期間 &amp; デポジット返金', tl4_p:'コンサート期間中、釜山のホストファミリーと宿泊します。チェックアウト時にデポジットが全額返金されます。',
      contact_eyebrow:'お問い合わせ', contact_title:'ご連絡ください',
      contact1_h3:'チャンネルトーク', contact1_p:'チャンネルトークでサポートチームとリアルタイムでチャット — 最速の対応です。',
      contact2_h3:'メール', contact2_p1:'<a href="mailto:cs@wehome.me">cs@wehome.me</a>', contact2_p2:'1営業日以内に返信します。',
      contact3_h3:'電話', contact3_p1:'<a href="tel:15445665">1544-5665</a>', contact3_p2:'平日 10:00–12:00、13:00–18:00',
      footer_host:'ホスト申し込み',
      footer_cs:'カスタマーサポート',
      about_nav_apply:'今すぐ申し込む ›',
      about_hero_eyebrow:'K-POPSTAYについて',
      about_hero_title:'K-POPSTAY',
      about_hero_sub:'K-POPが生み出す新しいホームシェアリング — 世界中のファンと現地ホストをつないで特別な体験を作ります。',
      about_ov_eyebrow:'サービス概要',
      about_ov_title:'K-POPSTAYとは？',
      about_ov_desc:'K-POPSTAYはWehomeが提供する新しいホームシェアリングサービスで、世界中のK-POPファンと現地ファンをつなぎ、宿泊問題を解決しながら意義深い文化交流を生み出します。',
      about_ov_label1:'目的',
      about_ov_p1:'K-POPSTAYは、大型K-POPコンサート時に発生する深刻な宿泊難と価格つり上げに対処するために作られました。地元ファン、市民、ホームシェアリングホスト、地方自治体が連携して公正なコミュニティ主導の代替手段を提供します。',
      about_ov_label2:'Wehomeのサポート',
      about_ov_p2:'Wehomeは自宅を無料で提供するホストに対して、プラットフォームサービスとマッチングを無償で提供し、ホストとゲスト双方の参入障壁をゼロにします。',
      about_val_eyebrow:'コアバリュー',
      about_val_title:'ゲスト、ホスト、社会への価値',
      about_val_desc:'K-POPSTAYは宿泊を超えて、ファン、地域コミュニティ、社会全体に意義深い価値を生み出します。',
      about_val1_type:'ゲスト', about_val1_title:'グローバルK-POPファンのための体験',
      about_val1_li1:'現地ファンと交流し、BTSの故郷のKライフスタイルを体験',
      about_val1_li2:'Wehomeが保証する合法認証ホームシェアリングの高品質',
      about_val1_li3:'無料または非常に手頃な宿泊費',
      about_val2_type:'ホスト', about_val2_title:'ホストに特別な機会',
      about_val2_li1:'世界中のK-POPファンと直接会って交流する滅多にない機会',
      about_val2_li2:'法的サポートで安全にホームシェアリングを開始（試験的プログラム）',
      about_val2_li3:'民間文化外交官としてKライフスタイルの普及に貢献',
      about_val3_type:'社会', about_val3_title:'社会的価値の創出',
      about_val3_li1:'コミュニティ主導の代替手段で大型イベント時の価格つり上げを根絶',
      about_val3_li2:'世界の旅行者の本物のKライフスタイル体験需要を充足',
      about_val3_li3:'既存の住宅を活用しながら地域住民に直接的な経済的恩恵を還元',
      about_host_eyebrow:'ホスト参加',
      about_host_title:'誰でもホストになれます',
      about_host_desc:'コンサートエリアのK-POPファン、地元市民、既存のWehomeホスト全員が参加できます。',
      about_hcard1_badge:'ファンホスト', about_hcard1_title:'ファンホスト',
      about_hcard1_p:'グローバルK-POPファンを歓迎したいファンなら誰でも申し込めます。自宅を無料で提供するホストは別途のホームシェアリング登録は不要です。ゲストが日々の生活費を支払い、これは全額ホストに精算されます。',
      about_hcard2_badge:'市民ホスト', about_hcard2_title:'市民ホスト',
      about_hcard2_p:'コンサート開催都市の居住者なら誰でもホストとして参加できます。ホームシェアリング経験がなくても、Wehomeの認証・サポートプロセスで安全にスタートできます。',
      about_hcard3_badge:'特別プロジェクト', about_hcard3_title:'釜山シーガルネストプロジェクト',
      about_hcard3_p:'K-POPSTAY BUSAN 2026の一環として、釜山市民がグローバルK-POPファンに無償で自宅を開放するプロジェクト。釜山市と共同開発しました。',
      about_hcard4_badge:'既存Wehomeホスト', about_hcard4_title:'既存Wehomeホスト',
      about_hcard4_p:'すでにWehomeに登録済みのホストも参加できます。選考は既存リスティングの評価と料金ポリシーを考慮し、ホームシェアリング試験的プログラムとしても申し込めます。',
      about_qualify_label:'参加資格',
      about_qualify_p:'無料宿泊を提供するファンホスト、またはWehomeホームシェアリング試験的プログラムに登録済みのホストが申し込めます。既存ホストはリスティング評価と料金ポリシーを基準に選考されます。',
      about_proc_eyebrow:'仕組み',
      about_proc_title:'マッチングプロセス',
      about_proc_desc:'申し込みからチェックアウトまで、Wehomeがすべてのステップをサポートします。',
      about_step1_title:'ホスト申し込みと選考',
      about_step1_desc:'ホストが申し込むと、Wehomeが書類審査と現地訪問を行い、安全性・清潔さ・法的適合性を評価してリスティングを選考します。',
      about_step2_title:'ゲスト申し込み',
      about_step2_desc:'ゲストはWehomeプラットフォームで事前申し込みを行い、希望する宿泊スタイルと日程を指定します。',
      about_step3_title:'マッチングと選考',
      about_step3_desc:'ホストが申し込み者プールから直接歓迎したいゲストを選べます。',
      about_step3_note:'Wehomeに委任した場合は先着順または抽選でマッチングします。',
      about_step4_title:'ファンホスト運営規定',
      about_step4_desc:'無料でスペースを提供するファンホストは正式なホームシェアリング事業者として登録する必要はありません。ただし、ゲストは日々の生活費を支払い、これは全額ホストに精算されます。',
      about_step5_title:'試験的プログラムと料金上限',
      about_step5_desc:'Wehomeは非居住者ホームシェアリング試験的プログラムへの登録が必要なホストに対して、迅速な登録サポートを提供します。',
      about_step5_note:'この場合、料金は前年同期の類似ホームシェアリング料金の2倍を超えてはなりません。',
      about_contact_eyebrow:'お問い合わせ',
      about_contact_title:'ご質問はありますか？',
      about_contact_desc:'ホスト申し込みやサービスの仕組みについていつでもお気軽にご連絡ください。',
      about_cc1_name:'ライブチャット',
      about_cc1_val:'WehomeウェブサイトからChat直接連絡',
      about_cc2_name:'電話',
      about_cc2_val:'1544-5665<br>平日 10:00–18:00 KST<br><span style="font-size:0.78rem;color:var(--text-300)">(昼12:00–13:00除く / 土日祝休)</span>',
      about_back:'← ホームへ戻る',
      apply_back:'← 戻る',
      apply_eyebrow:'ゲスト申し込み',
      apply_title:'無料宿泊に申し込む',
      apply_sub:'海外ARMYを優先。6月12–14日、釜山。',
      apply_form_h2:'ゲスト申し込みフォーム',
      apply_form_sub:'釜山コンサート · 2026年6月12–14日 · Powered by Wehome',
      apply_step1:'宿泊条件', apply_step2:'個人情報', apply_step3:'ARMY認証',
      apply_sec1:'宿泊条件', apply_sec2:'個人情報', apply_sec3:'ARMY認証',
      apply_stay_type:'宿泊タイプ',
      apply_private_title:'個室', apply_private_desc:'独立した部屋',
      apply_shared_title:'シェアルーム', apply_shared_desc:'他のゲストとシェア',
      apply_flex_title:'どちらでも', apply_flex_desc:'希望なし',
      apply_err_stay:'宿泊タイプを選択してください。',
      apply_guest_count:'人数',
      apply_count_placeholder:'人数を選択',
      apply_count_1:'1名', apply_count_2:'2名', apply_count_3:'3名', apply_count_4:'4名',
      apply_err_count:'人数を選択してください。',
      apply_gender:'性別',
      apply_female:'女性', apply_male:'男性', apply_other:'その他',
      apply_err_gender:'性別を選択してください。',
      apply_bed:'個別ベッドが必要ですか？',
      apply_bed_yes:'はい', apply_bed_no:'いいえ（床可）',
      apply_err_bed:'ベッドの希望を選択してください。',
      apply_checkin:'チェックイン日', apply_checkout:'チェックアウト日',
      apply_date_placeholder:'日付を選択',
      apply_date_note:'特別な事情がある場合は日付を調整できます。',
      apply_err_checkin:'チェックイン日を選択してください。',
      apply_err_checkout:'チェックアウト日を選択してください。',
      apply_name:'氏名', apply_name_placeholder:'氏名を入力',
      apply_err_name:'氏名を入力してください。',
      apply_nationality:'国籍',
      apply_nationality_placeholder:'国籍を選択',
      apply_err_nationality:'国籍を選択してください。',
      apply_phone:'電話番号', apply_phone_placeholder:'電話番号を入力',
      apply_err_phone:'電話番号を入力してください。',
      apply_email:'メールアドレス', apply_email_placeholder:'your@email.com',
      apply_err_email:'有効なメールアドレスを入力してください。',
      apply_languages:'使用可能言語',
      apply_err_language:'1つ以上選択してください。',
      apply_army_method:'ARMY認証方法',
      apply_weverse_title:'Weverse', apply_weverse_desc:'Weverseメンバーシップのスクリーンショット',
      apply_ticket_title:'コンサートチケット', apply_ticket_desc:'購入確認書',
      apply_fanclub_title:'ファンコミュニティ', apply_fanclub_desc:'ファンクラブ/コミュニティの投稿',
      apply_err_army:'認証方法を選択してください。',
      apply_upload:'証明ファイルをアップロード',
      apply_upload_click:'クリックまたはドラッグ＆ドロップ',
      apply_upload_size:'PNG, JPG, PDF — 最大10MB',
      apply_err_file:'証明ファイルをアップロードしてください。',
      apply_wehome_id:'Wehome ID（任意）',
      apply_wehome_placeholder:'WehomeアカウントID（任意）',
      apply_comments:'備考（任意）',
      apply_comments_placeholder:'ホストへのメッセージや特別なリクエストがあればご記入ください。',
      apply_referral_label:'K-POPSTAYをどこで知りましたか？',
      apply_referral_theqoo:'더쿠 (Theqoo)', apply_referral_naver:'Naver（ブログ/カフェ）',
      apply_referral_visitkorea:'VisitKorea', apply_referral_fan_community:'ファンコミュニティ',
      apply_referral_friend:'知人の紹介', apply_referral_baovanhoa:'Báo Văn Hóa（ベトナム）',
      apply_referral_kmmbox:'Korea.kr / KMMBOX',
      apply_deposit_title:'保証金ポリシー',
      apply_deposit_body:'選ばれたARMYゲストは<strong>1人あたり50,000ウォン</strong>の保証金をお支払いいただきます。チェックイン時に<strong>釜山観光ギフトカード</strong>の形で全額返金されます。<br><br>釜山観光ギフトカードのご提供ができない場合、ご宿泊後に保証金は元のお支払い方法に自動的に返金されます。',
      apply_agree_project:'本申し込みは<strong>K-POPSTAY BUSAN 2026 釜山シーガルネストプロジェクト</strong>の無料宿泊申し込みであることを確認し、選考された場合の案内事項に同意します。',
      apply_err_project:'上記内容に同意してください。',
      apply_agree_deposit:'<strong>50,000ウォンの保証金ポリシー</strong>を理解し同意します。チェックイン時に釜山観光ギフトカードとして全額返金されることを確認します。',
      apply_err_deposit:'保証金ポリシーに同意してください。',
      apply_agree_terms:'<a href="#" onclick="return false">利用規約</a>および<a href="#" onclick="return false">プライバシーポリシー</a>に同意します。',
      apply_err_agree:'利用規約に同意してください。',
      apply_btn_back:'← 戻る', apply_btn_continue:'次へ →', apply_btn_submit:'申し込みを送信', apply_btn_submitting:'送信中...',
      apply_success_title:'申し込みが受付されました！',
      apply_success_desc:'K-POPSTAY BUSAN 2026へのお申し込みありがとうございます。<br><strong>2026年6月6–7日</strong>までに審査結果をメールでお知らせします。<br><br>確認メールをご確認ください。海外ARMYを優先します。',
      apply_closed_msg:'多くのARMYゲストの皆さまのご応募に心より感謝申し上げます。<br>グローバルARMYを中心に選定し、ARMYホストおよびシティズンホストとマッチングして宿泊予約を進めてまいります。<br>選ばれたARMYの方々には、メールで結果をお知らせいたします。<br><br>ARMYの皆さまの温かいご支援に感謝いたします。',
      apply_closed_title:'申し込み締め切り',
      apply_closed_sub:'K-POPSTAY BUSAN 2026 · ありがとう、ARMY！',
      ch_nav:'ボラヘチャレンジ',
      ch_hero_eyebrow:'위홈 웰컴레터 & 보라해 한글 챌린지',
      ch_hero_title:'Wehome <span class="brand">ウェルカムレター</span><br>&amp; 釜山ステイ<br>ギャラリー',
      ch_hero_p:'インスタグラムにK-POPSTAY釜山の思い出をシェアしよう — ウェルカムレターに<strong>보라해</strong>を書いたり、ステイの写真、釜山でホストと一緒に何でもOK！',
      ch_poster_eyebrow:'ボラヘハングルチャレンジ',
      ch_poster_title:'自分だけのハングルアートを作ろう',
      ch_poster_desc:'到着時にホストが<strong>Wehomeボラヘハングルステッカーシート</strong>をくれます — 自分の名前、好きなBTSメンバー、好きな韓国語の言葉何でも書いてみて。韓国語ができなくても大丈夫！',
      ch_event_loc:'バリアクアランド · 6月12–13日',
      ch_event_s1_title:'ボタリを見つけよう',
      ch_event_s1_desc:'女性ロッカーをチェック — <em>ボラヘハングルキット</em>や<em>Wehomeギフトボタリ</em>が隠れていたらあなたのもの！',
      ch_event_s2_title:'ハングル壁チャレンジ',
      ch_event_s2_desc:'ステッカーで指定された壁に名前やメッセージを貼ってみよう。',
      ch_event_s3_title:'シェア &amp; アップロード',
      ch_event_s3_desc:'<button onclick="copyHashtag(\'#KPOPSTAYBusan\')" class="poster-hashtag-btn">#KPOPSTAYBusan</button> <button onclick="copyHashtag('#wehome')" class="poster-hashtag-btn">#wehome</button>でインスタに投稿して、ギャラリーに登録しよう！',
      ch_event_prizes_label:'賞品：',
      ch_event_prize1:'ボラヘハングルキット × 8–9個',
      ch_event_prize2:'Wehomeギフトボタリ × 2個',
      ch_gallery_eyebrow:'コミュニティギャラリー',
      ch_gallery_title:'釜山ステイギャラリー',
      ch_gallery_desc:'世界中のARMYが共有するK-POPSTAY釜山の思い出 — ウェルカムレター、ステイの記念、ホストとの釜山の冒険。',
      ch_gallery_share:'投稿をシェア',
      ch_gallery_counter_label:'釜山からシェアされた思い出',
      ch_gallery_filter_all:'すべて',
      ch_gallery_filter_insta:'SNS',
      ch_gallery_filter_upload:'写真アップロード',
      ch_gallery_loadmore:'もっと見る ›',
      ch_empty_title1:'ハングルアート',
      ch_empty_desc1:'ステッカーで韓国語を書いて写真を撮ろう',
      ch_empty_title2:'投稿 &amp; タグ',
      ch_empty_desc2:'<strong style="color:var(--purple)">#KPOPSTAYBusan</strong>でインスタにシェア',
      ch_empty_title3:'ギャラリーに参加',
      ch_empty_desc3:'リンクを送信 — 世界中のARMYが見られるギャラリーに表示されます',
      ch_empty_cta:'ここに<strong>最初のARMY</strong>として思い出を残してください。<br>あなたの投稿が最初に見られるものになります。',
      ch_modal_eyebrow:'ストーリーをシェア',
      ch_modal_title:'投稿を提出',
      ch_modal_tab_insta:'Instagramリンク',
      ch_modal_tab_upload:'写真アップロード',
      ch_modal_insta_sub:'Instagramの投稿リンクを貼り付けてください — 確認後ギャラリーに表示されます！',
      ch_modal_insta_url_label:'Instagram投稿URL',
      ch_modal_name_label:'お名前（任意）',
      ch_modal_name_ph:'例：ARMY_Japan',
      ch_modal_email_label:'メール（任意）',
      ch_modal_note_label:'ホストへのメッセージ（任意）',
      ch_modal_note_ph:'보라해！家を開けてくれてありがとう...',
      ch_modal_btn_insta:'投稿を提出 ›',
      ch_modal_upload_sub:'Instagramがない？写真を直接アップロードしよう — ハングルアート、ステイの思い出、釜山の瞬間何でも！',
      ch_modal_photo_label:'写真',
      ch_modal_photo_up_to:'最大5枚',
      ch_modal_photo_tap:'<strong>写真を選択</strong>',
      ch_modal_photo_hint:'最大5枚 · JPG, PNG, WEBP, GIF · 1枚最大10MB',
      ch_modal_caption_label:'キャプション（任意）',
      ch_modal_caption_ph:'보라해！釜山で作ったハングルアートです...',
      ch_modal_upload_note_label:'ホストへのメッセージ（任意）',
      ch_modal_btn_upload:'アップロード＆提出 ›',
      ch_alert_ok_title:'投稿完了',
      ch_alert_err_title:'エラー',
      ch_alert_confirm:'確認',
      ch_msg_ok_insta:'投稿完了！審査後にギャラリーに表示されます。',
      ch_msg_ok_upload_photo:'写真を投稿しました！審査後に表示されます。',
      ch_msg_ok_upload_video:'動画を投稿しました！審査後に表示されます。',
      ch_msg_err_no_photo:'写真を選択してください。',
      ch_msg_err_no_video:'動画ファイルを選択してください。',
      ch_msg_err_network:'ネットワークエラー。再試行してください。',
      ch_msg_err_dup:'すでに登録済みの投稿です。',
      ch_msg_err_limit:'1日の投稿上限に達しました。',
      ch_msg_err_url:'正しいInstagram URLを入力してください。',
      ch_msg_err_fail:'投稿に失敗しました。しばらくしてから再試行してください。',
      ch_reward_label:'スペシャルリワード',
      ch_reward_title:'優秀投稿に<span style="background:rgba(255,255,255,.2);border-radius:6px;padding:1px 8px">Wehome無料宿泊券</span>プレゼント',
      ch_reward_sub:'ハングルチャレンジの写真・動画を投稿してください！',
      ch_reward_btn:'今すぐ投稿'
    },
    zh_t: {
      nav_home:'首頁', nav_about:'K-POPSTAY', nav_guide:'訪客指南', nav_apply:'보라해挑戰 ›',
      hero_eyebrow:'K-POPSTAY BUSAN 2026',
      hero_title:'<span class="brand">釜山海鷗</span><br>巢穴',
      hero_subtitle:'以紫色歡迎全球粉絲，<br>由釜山市民傾情款待。',
      hero_city:'釜山 — 6月12–14日',
      hero_cta:'前往보라해挑戰 &amp; 心得 ›',
      hero_share:'分享',
      hero_host:'成為釜山市民房東 ›',
      hero_book:'Wehome釜山住宿九折優惠預訂 ›',
      hero_homestay:'釜山市民 homestay (Wehome) ›',
      fab:'前往보라해挑戰 &amp; 心得 ›',
      intro_tag:'公平且由社區主導的公民治理',
      intro_title:'釜山海鷗<br>巢穴',
      intro_h3:'關於本計劃',
      intro_p:'BTS宣布2026年釜山回歸演唱會後，釜山的住宿價格急劇攀升，部分房源甚至達到正常價格的10倍。這種哄抬物價的行為讓普通粉絲別無選擇，要麼支付高價，要麼放棄參加。<br><br>K-POPSTAY BUSAN是我們的回應：一個將ARMY粉絲與釜山市民房東相連的公民倡議，這些房東公平地開放自己的家，不趁機牟利。訪客住宿完全免費，並設有全額押金退還系統以確保雙方的信任。<br><br>這不是慈善，這是社區精神。釜山市民挺身而出：<em>「歡迎你來這裡。」</em>',
      whatis_eyebrow:'K-POPSTAY BUSAN',
      whatis_title:'什麼是K-POPSTAY BUSAN？',
      card01_num:'01', card01_title:'經過驗證的可靠房東',
      card01_desc:'每位房東都是通過Wehome平台認證的釜山市民。訪客可以放心預訂，知道自己的房東是真實、負責任且具有社區精神的。',
      card02_num:'02', card02_title:'100%可退還的保證金',
      card02_desc:'被選中的ARMY訪客每人需繳納50,000韓元的保證金。入住時，全額保證金將以釜山旅遊禮品卡的形式退還。釜山旅遊禮品卡可在釜山各合作商戶像現金一樣使用。',
      about_eyebrow:'關於我們',
      about_title:'由K-POP驅動的<br>全新家庭共享模式',
      about_desc:'BTS的2026年釜山回歸演唱會激勵了全球數萬名粉絲前往韓國旅行。K-POPSTAY是一個前所未有的公民計劃，將粉絲的熱情轉化為社區運動。',
      about_g1_title:'訪客', about_g1_desc:'海外ARMY在演唱會期間可獲得安全、經認證的免費住宿 — 由真正的釜山市民作為房東，分享他們的城市和文化。',
      about_g2_title:'房東', about_g2_desc:'釜山居民分享自己的家，結識全球粉絲，並為社區運動做出貢獻。房東通過Wehome平台獲得認可和支持。',
      about_g3_title:'社會', about_g3_desc:'活動旅遊的新模式 — 優先考慮公平、社區和文化交流而非利潤。未來全球K-POP活動的藍圖。',
      guide_eyebrow:'訪客指南', guide_title:'您需要了解的一切',
      guide_link_title:'閱讀訪客指南',
      guide_link_sub:'住宿規則 · 保證金政策 · 入住 · 客服支援',
      guide_label:'K-POPSTAY 釜山政策', guide_h3:'住宿費用及保證金政策',
      guide_cost:'訪客費用：0韓元',
      guide_p:'您的住宿完全免費。K-POPSTAY BUSAN是一項公民倡議 — 釜山市民房東自願向全球ARMY免費開放自己的家。',
      guide_highlight:'可退還保證金：預訂時收取少額保證金以確保雙方承諾。結帳時無條件100%退還。<br><br>如果我們無法提供釜山旅遊禮品卡，您的保證金將在入住後自動退還至原支付方式。',
      guide2_h3:'住宿規則',
      perk1_title:'禁止吸煙 — 금연', perk1_desc:'嚴格禁止在室內及場所內任何地方吸煙。',
      perk2_title:'禁止烹飪 — 취사 금지', perk2_desc:'住宿期間不允許烹飪及使用廚房電器。',
      perk3_title:'入住/退房時間 — 호스트별 별도 지정', perk3_desc:'入住和退房時間因房東而異，請在預訂後直接與房東確認。',
      partners_eyebrow:'合作夥伴 &amp; 支持者', partners_title:'獲得政府和業界支持',
      sched_eyebrow:'時間表', sched_title:'K-POPSTAY BUSAN 時間表',
      sched_desc:'官方訪客計劃時間表。<a href="/host">查看房東時間表 &rarr;</a>',
      tl1_date:'2026年5月29日', tl1_h4:'開放申請', tl1_p:'訪客申請正式開放。優先考慮海外ARMY。', tl1_badge:'現已開放',
      tl2_date:'2026年6月6–7日', tl2_h4:'訪客篩選 &amp; 配對公告', tl2_p:'被選中的訪客將收到通知，並與經認證的釜山市民房東配對。',
      tl3_date:'2026年6月8日', tl3_h4:'配對結果 &amp; 行程發送', tl3_p:'確認訪客的完整住宿詳情、房東介紹和行程將送達。',
      tl4_date:'2026年6月12–14日 · 2晚', tl4_h4:'住宿期間 &amp; 保證金退還', tl4_p:'訪客在演唱會期間與釜山房東家庭住宿。結帳時全額退還保證金。',
      contact_eyebrow:'聯繫我們', contact_title:'取得聯繫',
      contact1_h3:'Channel Talk', contact1_p:'透過Channel Talk與我們的支援團隊即時聊天 — 回應最快。',
      contact2_h3:'電子郵件', contact2_p1:'<a href="mailto:cs@wehome.me">cs@wehome.me</a>', contact2_p2:'1個工作日內回覆。',
      contact3_h3:'電話', contact3_p1:'<a href="tel:15445665">1544-5665</a>', contact3_p2:'平日 10:00–12:00、13:00–18:00',
      footer_host:'房東申請',
      footer_cs:'客戶支援',
      about_nav_apply:'立即申請 ›',
      about_hero_eyebrow:'關於K-POPSTAY',about_hero_title:'K-POPSTAY',
      about_hero_sub:'由K-POP驅動的全新家庭共享模式 — 連結全球粉絲與當地房東，創造特別的住宿體驗。',
      about_ov_eyebrow:'服務介紹',about_ov_title:'什麼是K-POPSTAY？',
      about_ov_desc:'K-POPSTAY是Wehome推出的全新家庭共享服務，連結全球K-POP粉絲與當地粉絲，解決住宿困難，同時創造有意義的文化交流。',
      about_ov_label1:'目的',about_ov_p1:'K-POPSTAY旨在解決大型K-POP演唱會期間嚴重的住宿短缺與哄抬物價問題。當地粉絲、普通市民、共享住宿房東及地方政府共同提供公平的社區替代方案。',
      about_ov_label2:'Wehome的支持',about_ov_p2:'Wehome為免費提供住所的房東提供全套平台服務和配對，確保房東和訪客都能零門檻參與。',
      about_val_eyebrow:'核心價值',about_val_title:'為訪客、房東及社會創造價值',
      about_val_desc:'K-POPSTAY超越住宿本身，為粉絲、地方社區和整個社會創造有意義的價值。',
      about_val1_type:'訪客',about_val1_title:'全球K-POP粉絲的特別體驗',
      about_val1_li1:'與當地粉絲交流，親身體驗BTS故鄉的K生活方式',
      about_val1_li2:'Wehome保障的合法認證高品質家庭共享',
      about_val1_li3:'免費或極為實惠的住宿費用',
      about_val2_type:'房東',about_val2_title:'房東的特別機會',
      about_val2_li1:'難得與全球K-POP粉絲面對面交流的機會',
      about_val2_li2:'在法律支持下安全開始家庭共享（試點計劃）',
      about_val2_li3:'作為民間文化大使，為K生活方式的傳播做出貢獻',
      about_val3_type:'社會',about_val3_title:'創造社會價值',
      about_val3_li1:'通過社區主導的替代方案解決大型活動哄抬物價問題',
      about_val3_li2:'滿足全球旅行者對正宗K生活方式體驗的需求',
      about_val3_li3:'利用現有住宅，將直接經濟利益回饋給當地居民',
      about_host_eyebrow:'房東參與',about_host_title:'任何人都可以成為房東',
      about_host_desc:'演唱會地區的K-POP粉絲、當地市民及現有Wehome房東均可參與。',
      about_hcard1_badge:'粉絲房東',about_hcard1_title:'粉絲房東',
      about_hcard1_p:'任何想歡迎全球K-POP粉絲的人均可申請。免費提供住所的房東無需單獨進行家庭共享登記。訪客支付每日生活費，全額結算給房東。',
      about_hcard2_badge:'市民房東',about_hcard2_title:'市民房東',
      about_hcard2_p:'演唱會舉辦城市的居民均可作為房東參與。即使沒有家庭共享經驗，Wehome的認證和支持流程也能確保安全順利地開始。',
      about_hcard3_badge:'特別計劃',about_hcard3_title:'釜山海鷗巢穴計劃',
      about_hcard3_p:'作為K-POPSTAY BUSAN 2026的一部分，釜山市民免費向全球K-POP粉絲開放住所，這是與釜山市共同開發的計劃。',
      about_hcard4_badge:'現有Wehome房東',about_hcard4_title:'現有Wehome房東',
      about_hcard4_p:'已在Wehome登記的房東也有資格參與。選拔考量現有房源評分和定價政策，房東可在家庭共享試點計劃下申請。',
      about_qualify_label:'參與資格',
      about_qualify_p:'申請對象為提供免費住宿的粉絲房東，或在Wehome家庭共享試點計劃下登記的房東。現有房東根據房源評估和定價政策進行選拔。',
      about_proc_eyebrow:'運作方式',about_proc_title:'配對流程',
      about_proc_desc:'從申請到退房，Wehome支持每個步驟。',
      about_step1_title:'房東申請與選拔',about_step1_desc:'房東申請後，Wehome審核文件並進行現場訪問，評估安全性、清潔度和法律合規性後選拔房源。',
      about_step2_title:'訪客申請',about_step2_desc:'訪客提前通過Wehome平台申請，指定偏好的住宿風格和日期。',
      about_step3_title:'配對與選拔',about_step3_desc:'房東可直接從申請者中選擇想要歡迎的訪客。',
      about_step3_note:'若委託Wehome，則按先到先得或抽籤方式配對。',
      about_step4_title:'粉絲房東運營規定',about_step4_desc:'免費提供空間的粉絲房東無需登記為正式家庭共享業者。但訪客須支付每日生活費，全額轉交房東。',
      about_step5_title:'試點計劃與費率上限',about_step5_desc:'Wehome為需要加入非居民家庭共享試點計劃的房東提供快速登記支持。',
      about_step5_note:'在此情況下，費率上限為前一年同期同類家庭共享費率的2倍。',
      about_contact_eyebrow:'聯繫我們',about_contact_title:'有問題嗎？',
      about_contact_desc:'隨時歡迎就房東申請或服務運作方式聯繫我們。',
      about_cc1_name:'即時聊天',about_cc1_val:'通過Wehome網站直接與我們聊天',
      about_cc2_name:'電話',about_cc2_val:'1544-5665<br>平日 10:00–18:00 KST<br><span style="font-size:0.78rem;color:var(--text-300)">(不含午休12:00–13:00 / 週末及假日休息)</span>',
      about_back:'← 返回首頁',
      apply_back:'← 返回',
      apply_eyebrow:'訪客申請',
      apply_title:'申請免費住宿',
      apply_sub:'海外ARMY優先。6月12–14日，釜山。',
      apply_form_h2:'訪客申請表',
      apply_form_sub:'釜山演唱會 · 2026年6月12–14日 · Powered by Wehome',
      apply_step1:'住宿偏好', apply_step2:'個人資料', apply_step3:'ARMY驗證',
      apply_sec1:'住宿偏好', apply_sec2:'個人資料', apply_sec3:'ARMY驗證',
      apply_stay_type:'住宿類型',
      apply_private_title:'獨立房間', apply_private_desc:'獨立房間',
      apply_shared_title:'共用房間', apply_shared_desc:'與其他訪客共用',
      apply_flex_title:'皆可', apply_flex_desc:'無偏好',
      apply_err_stay:'請選擇住宿類型。',
      apply_guest_count:'入住人數',
      apply_count_placeholder:'選擇人數',
      apply_count_1:'1人', apply_count_2:'2人', apply_count_3:'3人', apply_count_4:'4人',
      apply_err_count:'請選擇人數。',
      apply_gender:'性別',
      apply_female:'女性', apply_male:'男性', apply_other:'其他',
      apply_err_gender:'請選擇性別。',
      apply_bed:'是否需要獨立床位？',
      apply_bed_yes:'需要', apply_bed_no:'不需要（可睡地板）',
      apply_err_bed:'請選擇床位偏好。',
      apply_checkin:'入住日期', apply_checkout:'退房日期',
      apply_date_placeholder:'選擇日期',
      apply_date_note:'如有特殊情況，可調整日期。',
      apply_err_checkin:'請選擇入住日期。',
      apply_err_checkout:'請選擇退房日期。',
      apply_name:'姓名', apply_name_placeholder:'輸入姓名',
      apply_err_name:'請輸入姓名。',
      apply_nationality:'國籍',
      apply_nationality_placeholder:'選擇國籍',
      apply_err_nationality:'請選擇國籍。',
      apply_phone:'電話號碼', apply_phone_placeholder:'電話號碼',
      apply_err_phone:'請輸入電話號碼。',
      apply_email:'電子郵件', apply_email_placeholder:'your@email.com',
      apply_err_email:'請輸入有效的電子郵件。',
      apply_languages:'可溝通語言',
      apply_err_language:'請至少選擇一種語言。',
      apply_army_method:'ARMY驗證方式',
      apply_weverse_title:'Weverse', apply_weverse_desc:'Weverse會員截圖',
      apply_ticket_title:'演唱會門票', apply_ticket_desc:'購買確認書',
      apply_fanclub_title:'粉絲社群', apply_fanclub_desc:'粉絲俱樂部/社群帖子',
      apply_err_army:'請選擇驗證方式。',
      apply_upload:'上傳驗證文件',
      apply_upload_click:'點擊上傳或拖放文件',
      apply_upload_size:'PNG, JPG, PDF — 最大10MB',
      apply_err_file:'請上傳驗證文件。',
      apply_wehome_id:'Wehome ID（選填）',
      apply_wehome_placeholder:'Wehome帳號ID（選填）',
      apply_comments:'備注（選填）',
      apply_comments_placeholder:'請輸入給房東的留言或特殊要求。',
      apply_referral_label:'您如何得知K-POPSTAY？',
      apply_referral_theqoo:'더쿠 (Theqoo)', apply_referral_naver:'Naver（部落格/論壇）',
      apply_referral_visitkorea:'VisitKorea', apply_referral_fan_community:'粉絲社群',
      apply_referral_friend:'朋友介紹', apply_referral_baovanhoa:'Báo Văn Hóa（越南）',
      apply_referral_kmmbox:'Korea.kr / KMMBOX',
      apply_deposit_title:'保證金政策',
      apply_deposit_body:'被選中的ARMY訪客每人需繳納<strong>50,000韓元</strong>保證金。入住時將以<strong>釜山旅遊禮品卡</strong>形式全額退還。<br><br>如果我們無法提供釜山旅遊禮品卡，您的保證金將在入住後自動退還至原支付方式。',
      apply_agree_project:'本申請為<strong>K-POPSTAY BUSAN 2026 釜山海鷗巢穴計劃</strong>的免費住宿申請，若申請獲批，我同意相關安排。',
      apply_err_project:'請確認上述內容。',
      apply_agree_deposit:'我了解並同意<strong>50,000韓元保證金政策</strong>，確認入住時將以釜山旅遊禮品卡全額退還。',
      apply_err_deposit:'請同意保證金政策。',
      apply_agree_terms:'我同意<a href="#" onclick="return false">服務條款</a>及<a href="#" onclick="return false">隱私政策</a>。',
      apply_err_agree:'請同意條款。',
      apply_btn_back:'← 返回', apply_btn_continue:'繼續 →', apply_btn_submit:'提交申請', apply_btn_submitting:'提交中...',
      apply_success_title:'申請已提交！',
      apply_success_desc:'感謝您申請K-POPSTAY BUSAN 2026。<br>我們將在<strong>2026年6月6–7日</strong>前審核並通知您。<br><br>請查收確認郵件。優先考慮海外ARMY。',
      apply_closed_msg:'非常感謝眾多ARMY訪客的踴躍參與。<br>我們將以全球ARMY為中心進行選拔，並與ARMY房東及市民房東進行配對，安排住宿預訂。<br>入選的ARMY將透過電子郵件收到結果通知。<br><br>感謝ARMY們的熱情支持！',
      apply_closed_title:'申請已截止',
      apply_closed_sub:'K-POPSTAY BUSAN 2026 · 謝謝您，ARMY！',
      ch_nav:'보라해挑戰',
      ch_hero_eyebrow:'위홈 웰컴레터 & 보라해 한글 챌린지',
      ch_hero_title:'Wehome <span class="brand">歡迎信</span><br>&amp; 釜山住宿<br>相簿',
      ch_hero_p:'在Instagram分享你的K-POPSTAY釜山時刻 — 在歡迎信上寫<strong>보라해</strong>、拍住宿照片、和房東在釜山的冒險，什麼都可以！',
      ch_poster_eyebrow:'보라해韓文挑戰',
      ch_poster_title:'創作你的韓文藝術',
      ch_poster_desc:'到達時房東會給你<strong>Wehome보라해韓文貼紙頁</strong> — 用它寫你的名字、最愛的BTS成員、或任何你喜歡的韓文單詞。不懂韓文也沒關係！',
      ch_event_loc:'Bally Aqua Land · 6月12–13日',
      ch_event_s1_title:'尋找보따리',
      ch_event_s1_desc:'查看女性更衣室儲物格 — 找到隱藏的<em>보라해韓文組合</em>或<em>Wehome禮物보따리</em>就是你的了！',
      ch_event_s2_title:'韓文牆面挑戰',
      ch_event_s2_desc:'用貼紙在指定牆面拼出你的名字或訊息。',
      ch_event_s3_title:'分享 &amp; 上傳',
      ch_event_s3_desc:'在Instagram上傳，標記<button onclick="copyHashtag(\'#KPOPSTAYBusan\')" class="poster-hashtag-btn">#KPOPSTAYBusan</button> <button onclick="copyHashtag('#wehome')" class="poster-hashtag-btn">#wehome</button>，再提交到相簿！',
      ch_event_prizes_label:'獎品：',
      ch_event_prize1:'보라해韓文組合 × 8–9個',
      ch_event_prize2:'Wehome禮物보따리 × 2個',
      ch_gallery_eyebrow:'社群相簿',
      ch_gallery_title:'釜山住宿相簿',
      ch_gallery_desc:'來自世界各地的ARMY分享K-POPSTAY釜山時刻 — 歡迎信、住宿回憶、和房東的釜山冒險。',
      ch_gallery_share:'分享我的貼文',
      ch_gallery_counter_label:'從釜山分享的回憶',
      ch_gallery_filter_all:'全部',
      ch_gallery_filter_insta:'SNS',
      ch_gallery_filter_upload:'上傳照片',
      ch_gallery_loadmore:'載入更多 ›',
      ch_empty_title1:'你的韓文藝術',
      ch_empty_desc1:'用貼紙寫韓文單詞並拍照',
      ch_empty_title2:'發佈 &amp; 標記',
      ch_empty_desc2:'在Instagram標記<strong style="color:var(--purple)">#KPOPSTAYBusan</strong>分享',
      ch_empty_title3:'加入相簿',
      ch_empty_desc3:'提交連結 — 你的貼文將出現在全世界ARMY都能看到的相簿',
      ch_empty_cta:'成為這裡<strong>第一位ARMY</strong>留下回憶。<br>你的貼文將是所有人第一眼看到的。',
      ch_modal_eyebrow:'分享你的故事',
      ch_modal_title:'提交貼文',
      ch_modal_tab_insta:'Instagram連結',
      ch_modal_tab_upload:'上傳照片',
      ch_modal_insta_sub:'貼上你的Instagram貼文連結 — 審核後將出現在相簿！',
      ch_modal_insta_url_label:'Instagram貼文網址',
      ch_modal_name_label:'你的名字（選填）',
      ch_modal_name_ph:'例：ARMY_Taiwan',
      ch_modal_email_label:'電子郵件（選填）',
      ch_modal_note_label:'給房東的訊息（選填）',
      ch_modal_note_ph:'보라해！謝謝你開放你的家...',
      ch_modal_btn_insta:'提交貼文 ›',
      ch_modal_upload_sub:'沒有Instagram？直接上傳照片 — 韓文藝術、住宿回憶、釜山時刻，什麼都可以！',
      ch_modal_photo_label:'照片',
      ch_modal_photo_up_to:'最多5張',
      ch_modal_photo_tap:'<strong>點選選擇照片</strong>',
      ch_modal_photo_hint:'最多5張 · JPG, PNG, WEBP, GIF · 每張最大10MB',
      ch_modal_caption_label:'說明文字（選填）',
      ch_modal_caption_ph:'보라해！這是我在釜山創作的韓文藝術...',
      ch_modal_upload_note_label:'給房東的訊息（選填）',
      ch_modal_btn_upload:'上傳 &amp; 提交 ›',
      ch_reward_label:'特別獎勵',
      ch_alert_ok_title:'提交成功',
      ch_alert_err_title:'錯誤',
      ch_alert_confirm:'確認',
      ch_msg_ok_insta:'提交成功！審核後將顯示在相簿。',
      ch_msg_ok_upload_photo:'照片已提交！審核後將顯示在相簿。',
      ch_msg_ok_upload_video:'影片已提交！審核後將顯示在相簿。',
      ch_msg_err_no_photo:'請選擇至少一張照片。',
      ch_msg_err_no_video:'請選擇影片檔案。',
      ch_msg_err_network:'網路錯誤，請再試一次。',
      ch_msg_err_dup:'此貼文已提交過了。',
      ch_msg_err_limit:'已達今日提交上限。',
      ch_msg_err_url:'請輸入正確的Instagram網址。',
      ch_msg_err_fail:'提交失敗，請稍後再試。',
      ch_reward_title:'優秀貼文贏得<span style="background:rgba(255,255,255,.2);border-radius:6px;padding:1px 8px">Wehome免費住宿</span>',
      ch_reward_sub:'上傳你的韓文挑戰照片或影片吧！',
      ch_reward_btn:'立即提交'
    },
    zh_s: {
      nav_home:'首页', nav_about:'K-POPSTAY', nav_guide:'访客指南', nav_apply:'보라해挑战 ›',
      hero_eyebrow:'K-POPSTAY BUSAN 2026',
      hero_title:'<span class="brand">釜山海鸥</span><br>巢穴',
      hero_subtitle:'以紫色欢迎全球粉丝，<br>由釜山市民倾情款待。',
      hero_city:'釜山 — 6月12–14日',
      hero_cta:'前往보라해挑战 &amp; 评价 ›',
      hero_share:'分享',
      hero_host:'成为釜山市民房东 ›',
      hero_book:'Wehome釜山住宿九折优惠预订 ›',
      hero_homestay:'釜山市民 homestay (Wehome) ›',
      fab:'前往보라해挑战 &amp; 评价 ›',
      intro_tag:'公平且由社区主导的公民治理',
      intro_title:'釜山海鸥<br>巢穴',
      intro_h3:'关于本计划',
      intro_p:'BTS宣布2026年釜山回归演唱会后，釜山的住宿价格急剧攀升，部分房源甚至达到正常价格的10倍。这种哄抬物价的行为让普通粉丝别无选择，要么支付高价，要么放弃参加。<br><br>K-POPSTAY BUSAN是我们的回应：一个将ARMY粉丝与釜山市民房东相连的公民倡议，这些房东公平地开放自己的家，不趁机牟利。访客住宿完全免费，并设有全额押金退还系统以确保双方的信任。<br><br>这不是慈善，这是社区精神。釜山市民挺身而出：<em>「欢迎你来这里。」</em>',
      whatis_eyebrow:'K-POPSTAY BUSAN',
      whatis_title:'什么是K-POPSTAY BUSAN？',
      card01_num:'01', card01_title:'经过验证的可靠房东',
      card01_desc:'每位房东都是通过Wehome平台认证的釜山市民。访客可以放心预订，知道自己的房东是真实、负责任且具有社区精神的。',
      card02_num:'02', card02_title:'100%可退还的保证金',
      card02_desc:'被选中的ARMY访客每人需缴纳50,000韩元的保证金。入住时，全额保证金将以釜山旅游礼品卡的形式退还。釜山旅游礼品卡可在釜山各合作商户像现金一样使用。',
      about_eyebrow:'关于我们',
      about_title:'由K-POP驱动的<br>全新家庭共享模式',
      about_desc:'BTS的2026年釜山回归演唱会激励了全球数万名粉丝前往韩国旅行。K-POPSTAY是一个前所未有的公民计划，将粉丝的热情转化为社区运动。',
      about_g1_title:'访客', about_g1_desc:'海外ARMY在演唱会期间可获得安全、经认证的免费住宿 — 由真正的釜山市民作为房东，分享他们的城市和文化。',
      about_g2_title:'房东', about_g2_desc:'釜山居民分享自己的家，结识全球粉丝，并为社区运动做出贡献。房东通过Wehome平台获得认可和支持。',
      about_g3_title:'社会', about_g3_desc:'活动旅游的新模式 — 优先考虑公平、社区和文化交流而非利润。未来全球K-POP活动的蓝图。',
      guide_eyebrow:'访客指南', guide_title:'您需要了解的一切',
      guide_link_title:'阅读访客指南',
      guide_link_sub:'住宿规则 · 保证金政策 · 入住 · 客服支持',
      guide_label:'K-POPSTAY 釜山政策', guide_h3:'住宿费用及保证金政策',
      guide_cost:'访客费用：0韩元',
      guide_p:'您的住宿完全免费。K-POPSTAY BUSAN是一项公民倡议 — 釜山市民房东自愿向全球ARMY免费开放自己的家。',
      guide_highlight:'可退还保证金：预订时收取少额保证金以确保双方承诺。退房时无条件100%退还。<br><br>如果我们无法提供釜山旅游礼品卡，您的押金将在入住后自动退还至原支付方式。',
      guide2_h3:'住宿规则',
      perk1_title:'禁止吸烟 — 금연', perk1_desc:'严格禁止在室内及场所内任何地方吸烟。',
      perk2_title:'禁止烹饪 — 취사 금지', perk2_desc:'住宿期间不允许烹饪及使用厨房电器。',
      perk3_title:'入住/退房时间 — 호스트별 별도 지정', perk3_desc:'入住和退房时间因房东而异，请在预订后直接与房东确认。',
      partners_eyebrow:'合作伙伴 &amp; 支持者', partners_title:'获得政府和业界支持',
      sched_eyebrow:'时间表', sched_title:'K-POPSTAY BUSAN 时间表',
      sched_desc:'官方访客计划时间表。<a href="/host">查看房东时间表 &rarr;</a>',
      tl1_date:'2026年5月29日', tl1_h4:'开放申请', tl1_p:'访客申请正式开放。优先考虑海外ARMY。', tl1_badge:'现已开放',
      tl2_date:'2026年6月6–7日', tl2_h4:'访客筛选 &amp; 配对公告', tl2_p:'被选中的访客将收到通知，并与经认证的釜山市民房东配对。',
      tl3_date:'2026年6月8日', tl3_h4:'配对结果 &amp; 行程发送', tl3_p:'确认访客的完整住宿详情、房东介绍和行程将送达。',
      tl4_date:'2026年6月12–14日 · 2晚', tl4_h4:'住宿期间 &amp; 保证金退还', tl4_p:'访客在演唱会期间与釜山房东家庭住宿。退房时全额退还保证金。',
      contact_eyebrow:'联系我们', contact_title:'取得联系',
      contact1_h3:'Channel Talk', contact1_p:'通过Channel Talk与我们的支援团队实时聊天 — 回应最快。',
      contact2_h3:'电子邮件', contact2_p1:'<a href="mailto:cs@wehome.me">cs@wehome.me</a>', contact2_p2:'1个工作日内回复。',
      contact3_h3:'电话', contact3_p1:'<a href="tel:15445665">1544-5665</a>', contact3_p2:'平日 10:00–12:00、13:00–18:00',
      footer_host:'房东申请',
      footer_cs:'客户支持',
      about_nav_apply:'立即申请 ›',
      about_hero_eyebrow:'关于K-POPSTAY',about_hero_title:'K-POPSTAY',
      about_hero_sub:'由K-POP驱动的全新家庭共享模式 — 连结全球粉丝与当地房东，创造特别的住宿体验。',
      about_ov_eyebrow:'服务介绍',about_ov_title:'什么是K-POPSTAY？',
      about_ov_desc:'K-POPSTAY是Wehome推出的全新家庭共享服务，连结全球K-POP粉丝与当地粉丝，解决住宿困难，同时创造有意义的文化交流。',
      about_ov_label1:'目的',about_ov_p1:'K-POPSTAY旨在解决大型K-POP演唱会期间严重的住宿短缺与哄抬物价问题。当地粉丝、普通市民、共享住宿房东及地方政府共同提供公平的社区替代方案。',
      about_ov_label2:'Wehome的支持',about_ov_p2:'Wehome为免费提供住所的房东提供全套平台服务和配对，确保房东和访客都能零门槛参与。',
      about_val_eyebrow:'核心价值',about_val_title:'为访客、房东及社会创造价值',
      about_val_desc:'K-POPSTAY超越住宿本身，为粉丝、地方社区和整个社会创造有意义的价值。',
      about_val1_type:'访客',about_val1_title:'全球K-POP粉丝的特别体验',
      about_val1_li1:'与当地粉丝交流，亲身体验BTS故乡的K生活方式',
      about_val1_li2:'Wehome保障的合法认证高品质家庭共享',
      about_val1_li3:'免费或极为实惠的住宿费用',
      about_val2_type:'房东',about_val2_title:'房东的特别机会',
      about_val2_li1:'难得与全球K-POP粉丝面对面交流的机会',
      about_val2_li2:'在法律支持下安全开始家庭共享（试点计划）',
      about_val2_li3:'作为民间文化大使，为K生活方式的传播做出贡献',
      about_val3_type:'社会',about_val3_title:'创造社会价值',
      about_val3_li1:'通过社区主导的替代方案解决大型活动哄抬物价问题',
      about_val3_li2:'满足全球旅行者对正宗K生活方式体验的需求',
      about_val3_li3:'利用现有住宅，将直接经济利益回馈给当地居民',
      about_host_eyebrow:'房东参与',about_host_title:'任何人都可以成为房东',
      about_host_desc:'演唱会地区的K-POP粉丝、当地市民及现有Wehome房东均可参与。',
      about_hcard1_badge:'粉丝房东',about_hcard1_title:'粉丝房东',
      about_hcard1_p:'任何想欢迎全球K-POP粉丝的人均可申请。免费提供住所的房东无需单独进行家庭共享登记。访客支付每日生活费，全额结算给房东。',
      about_hcard2_badge:'市民房东',about_hcard2_title:'市民房东',
      about_hcard2_p:'演唱会举办城市的居民均可作为房东参与。即使没有家庭共享经验，Wehome的认证和支持流程也能确保安全顺利地开始。',
      about_hcard3_badge:'特别计划',about_hcard3_title:'釜山海鸥巢穴计划',
      about_hcard3_p:'作为K-POPSTAY BUSAN 2026的一部分，釜山市民免费向全球K-POP粉丝开放住所，这是与釜山市共同开发的计划。',
      about_hcard4_badge:'现有Wehome房东',about_hcard4_title:'现有Wehome房东',
      about_hcard4_p:'已在Wehome登记的房东也有资格参与。选拔考量现有房源评分和定价政策，房东可在家庭共享试点计划下申请。',
      about_qualify_label:'参与资格',
      about_qualify_p:'申请对象为提供免费住宿的粉丝房东，或在Wehome家庭共享试点计划下登记的房东。现有房东根据房源评估和定价政策进行选拔。',
      about_proc_eyebrow:'运作方式',about_proc_title:'配对流程',
      about_proc_desc:'从申请到退房，Wehome支持每个步骤。',
      about_step1_title:'房东申请与选拔',about_step1_desc:'房东申请后，Wehome审核文件并进行现场访问，评估安全性、清洁度和法律合规性后选拔房源。',
      about_step2_title:'访客申请',about_step2_desc:'访客提前通过Wehome平台申请，指定偏好的住宿风格和日期。',
      about_step3_title:'配对与选拔',about_step3_desc:'房东可直接从申请者中选择想要欢迎的访客。',
      about_step3_note:'若委托Wehome，则按先到先得或抽签方式配对。',
      about_step4_title:'粉丝房东运营规定',about_step4_desc:'免费提供空间的粉丝房东无需登记为正式家庭共享业者。但访客须支付每日生活费，全额转交房东。',
      about_step5_title:'试点计划与费率上限',about_step5_desc:'Wehome为需要加入非居民家庭共享试点计划的房东提供快速登记支持。',
      about_step5_note:'在此情况下，费率上限为前一年同期同类家庭共享费率的2倍。',
      about_contact_eyebrow:'联系我们',about_contact_title:'有问题吗？',
      about_contact_desc:'随时欢迎就房东申请或服务运作方式联系我们。',
      about_cc1_name:'即时聊天',about_cc1_val:'通过Wehome网站直接与我们聊天',
      about_cc2_name:'电话',about_cc2_val:'1544-5665<br>平日 10:00–18:00 KST<br><span style="font-size:0.78rem;color:var(--text-300)">(不含午休12:00–13:00 / 周末及假日休息)</span>',
      about_back:'← 返回首页',
      apply_back:'← 返回',
      apply_eyebrow:'访客申请',
      apply_title:'申请免费住宿',
      apply_sub:'海外ARMY优先。6月12–14日，釜山。',
      apply_form_h2:'访客申请表',
      apply_form_sub:'釜山演唱会 · 2026年6月12–14日 · Powered by Wehome',
      apply_step1:'住宿偏好', apply_step2:'个人信息', apply_step3:'ARMY认证',
      apply_sec1:'住宿偏好', apply_sec2:'个人信息', apply_sec3:'ARMY认证',
      apply_stay_type:'住宿类型',
      apply_private_title:'独立房间', apply_private_desc:'独立房间',
      apply_shared_title:'共用房间', apply_shared_desc:'与其他访客共用',
      apply_flex_title:'皆可', apply_flex_desc:'无偏好',
      apply_err_stay:'请选择住宿类型。',
      apply_guest_count:'入住人数',
      apply_count_placeholder:'选择人数',
      apply_count_1:'1人', apply_count_2:'2人', apply_count_3:'3人', apply_count_4:'4人',
      apply_err_count:'请选择人数。',
      apply_gender:'性别',
      apply_female:'女性', apply_male:'男性', apply_other:'其他',
      apply_err_gender:'请选择性别。',
      apply_bed:'是否需要独立床位？',
      apply_bed_yes:'需要', apply_bed_no:'不需要（可睡地板）',
      apply_err_bed:'请选择床位偏好。',
      apply_checkin:'入住日期', apply_checkout:'退房日期',
      apply_date_placeholder:'选择日期',
      apply_date_note:'如有特殊情况，可调整日期。',
      apply_err_checkin:'请选择入住日期。',
      apply_err_checkout:'请选择退房日期。',
      apply_name:'姓名', apply_name_placeholder:'输入姓名',
      apply_err_name:'请输入姓名。',
      apply_nationality:'国籍',
      apply_nationality_placeholder:'选择国籍',
      apply_err_nationality:'请选择国籍。',
      apply_phone:'电话号码', apply_phone_placeholder:'电话号码',
      apply_err_phone:'请输入电话号码。',
      apply_email:'电子邮件', apply_email_placeholder:'your@email.com',
      apply_err_email:'请输入有效的电子邮件。',
      apply_languages:'可沟通语言',
      apply_err_language:'请至少选择一种语言。',
      apply_army_method:'ARMY认证方式',
      apply_weverse_title:'Weverse', apply_weverse_desc:'Weverse会员截图',
      apply_ticket_title:'演唱会门票', apply_ticket_desc:'购买确认书',
      apply_fanclub_title:'粉丝社群', apply_fanclub_desc:'粉丝俱乐部/社群帖子',
      apply_err_army:'请选择认证方式。',
      apply_upload:'上传认证文件',
      apply_upload_click:'点击上传或拖放文件',
      apply_upload_size:'PNG, JPG, PDF — 最大10MB',
      apply_err_file:'请上传认证文件。',
      apply_wehome_id:'Wehome ID（选填）',
      apply_wehome_placeholder:'Wehome账号ID（选填）',
      apply_comments:'备注（选填）',
      apply_comments_placeholder:'请输入给房东的留言或特殊要求。',
      apply_referral_label:'您如何得知K-POPSTAY？',
      apply_referral_theqoo:'더쿠 (Theqoo)', apply_referral_naver:'Naver（博客/论坛）',
      apply_referral_visitkorea:'VisitKorea', apply_referral_fan_community:'粉丝社群',
      apply_referral_friend:'朋友介绍', apply_referral_baovanhoa:'Báo Văn Hóa（越南）',
      apply_referral_kmmbox:'Korea.kr / KMMBOX',
      apply_deposit_title:'保证金政策',
      apply_deposit_body:'被选中的ARMY访客每人需缴纳<strong>50,000韩元</strong>保证金。入住时将以<strong>釜山旅游礼品卡</strong>形式全额退还。<br><br>如果我们无法提供釜山旅游礼品卡，您的押金将在入住后自动退还至原支付方式。',
      apply_agree_project:'本申请为<strong>K-POPSTAY BUSAN 2026 釜山海鸥巢穴计划</strong>的免费住宿申请，若申请获批，我同意相关安排。',
      apply_err_project:'请确认上述内容。',
      apply_agree_deposit:'我了解并同意<strong>50,000韩元保证金政策</strong>，确认入住时将以釜山旅游礼品卡全额退还。',
      apply_err_deposit:'请同意保证金政策。',
      apply_agree_terms:'我同意<a href="#" onclick="return false">服务条款</a>及<a href="#" onclick="return false">隐私政策</a>。',
      apply_err_agree:'请同意条款。',
      apply_btn_back:'← 返回', apply_btn_continue:'继续 →', apply_btn_submit:'提交申请', apply_btn_submitting:'提交中...',
      apply_success_title:'申请已提交！',
      apply_success_desc:'感谢您申请K-POPSTAY BUSAN 2026。<br>我们将在<strong>2026年6月6–7日</strong>前审核并通知您。<br><br>请查收确认邮件。优先考虑海外ARMY。',
      apply_closed_msg:'非常感谢众多ARMY访客的踊跃参与。<br>我们将以全球ARMY为中心进行选拔，并与ARMY房东及市民房东进行配对，安排住宿预订。<br>入选的ARMY将通过电子邮件收到结果通知。<br><br>感谢ARMY们的热情支持！',
      apply_closed_title:'申请已截止',
      apply_closed_sub:'K-POPSTAY BUSAN 2026 · 谢谢你，ARMY！',
      ch_nav:'보라해挑战',
      ch_hero_eyebrow:'위홈 웰컴레터 & 보라해 한글 챌린지',
      ch_hero_title:'Wehome <span class="brand">欢迎信</span><br>&amp; 釜山住宿<br>相册',
      ch_hero_p:'在Instagram分享你的K-POPSTAY釜山时刻 — 在欢迎信上写<strong>보라해</strong>、拍住宿照片、和房东在釜山的冒险，什么都可以！',
      ch_poster_eyebrow:'보라해韩文挑战',
      ch_poster_title:'创作你的韩文艺术',
      ch_poster_desc:'到达时房东会给你<strong>Wehome보라해韩文贴纸页</strong> — 用它写你的名字、最喜欢的BTS成员、或任何韩文单词。不懂韩文也没关系！',
      ch_event_loc:'Bally Aqua Land · 6月12–13日',
      ch_event_s1_title:'寻找보따리',
      ch_event_s1_desc:'查看女性储物柜 — 找到隐藏的<em>보라해韩文套装</em>或<em>Wehome礼物보따리</em>就是你的了！',
      ch_event_s2_title:'韩文墙面挑战',
      ch_event_s2_desc:'用贴纸在指定墙面拼出你的名字或留言。',
      ch_event_s3_title:'分享 &amp; 上传',
      ch_event_s3_desc:'在Instagram上传，标记<button onclick="copyHashtag(\'#KPOPSTAYBusan\')" class="poster-hashtag-btn">#KPOPSTAYBusan</button> <button onclick="copyHashtag('#wehome')" class="poster-hashtag-btn">#wehome</button>，再提交到相册！',
      ch_event_prizes_label:'奖品：',
      ch_event_prize1:'보라해韩文套装 × 8–9个',
      ch_event_prize2:'Wehome礼物보따리 × 2个',
      ch_gallery_eyebrow:'社区相册',
      ch_gallery_title:'釜山住宿相册',
      ch_gallery_desc:'来自世界各地的ARMY分享K-POPSTAY釜山时刻 — 欢迎信、住宿回忆、和房东的釜山冒险。',
      ch_gallery_share:'分享我的帖子',
      ch_gallery_counter_label:'从釜山分享的回忆',
      ch_gallery_filter_all:'全部',
      ch_gallery_filter_insta:'SNS',
      ch_gallery_filter_upload:'上传照片',
      ch_gallery_loadmore:'加载更多 ›',
      ch_empty_title1:'你的韩文艺术',
      ch_empty_desc1:'用贴纸写韩文单词并拍照',
      ch_empty_title2:'发布 &amp; 标记',
      ch_empty_desc2:'在Instagram标记<strong style="color:var(--purple)">#KPOPSTAYBusan</strong>分享',
      ch_empty_title3:'加入相册',
      ch_empty_desc3:'提交链接 — 你的帖子将出现在全世界ARMY都能看到的相册',
      ch_empty_cta:'成为这里<strong>第一位ARMY</strong>留下回忆。<br>你的帖子将是所有人第一眼看到的。',
      ch_modal_eyebrow:'分享你的故事',
      ch_modal_title:'提交帖子',
      ch_modal_tab_insta:'Instagram链接',
      ch_modal_tab_upload:'上传照片',
      ch_modal_insta_sub:'粘贴你的Instagram帖子链接 — 审核后将出现在相册！',
      ch_modal_insta_url_label:'Instagram帖子网址',
      ch_modal_name_label:'你的名字（选填）',
      ch_modal_name_ph:'例：ARMY_China',
      ch_modal_email_label:'电子邮件（选填）',
      ch_modal_note_label:'给房东的留言（选填）',
      ch_modal_note_ph:'보라해！谢谢你开放你的家...',
      ch_modal_btn_insta:'提交帖子 ›',
      ch_modal_upload_sub:'没有Instagram？直接上传照片 — 韩文艺术、住宿回忆、釜山时刻，什么都可以！',
      ch_modal_photo_label:'照片',
      ch_modal_photo_up_to:'最多5张',
      ch_modal_photo_tap:'<strong>点击选择照片</strong>',
      ch_modal_photo_hint:'最多5张 · JPG, PNG, WEBP, GIF · 每张最大10MB',
      ch_modal_caption_label:'说明文字（选填）',
      ch_modal_caption_ph:'보라해！这是我在釜山创作的韩文艺术...',
      ch_modal_upload_note_label:'给房东的留言（选填）',
      ch_modal_btn_upload:'上传 &amp; 提交 ›',
      ch_alert_ok_title:'提交成功',
      ch_alert_err_title:'错误',
      ch_alert_confirm:'确认',
      ch_msg_ok_insta:'提交成功！审核后将显示在相册。',
      ch_msg_ok_upload_photo:'照片已提交！审核后将显示在相册。',
      ch_msg_ok_upload_video:'视频已提交！审核后将显示在相册。',
      ch_msg_err_no_photo:'请选择至少一张照片。',
      ch_msg_err_no_video:'请选择视频文件。',
      ch_msg_err_network:'网络错误，请再试一次。',
      ch_msg_err_dup:'该帖子已提交过了。',
      ch_msg_err_limit:'已达今日提交上限。',
      ch_msg_err_url:'请输入正确的Instagram网址。',
      ch_msg_err_fail:'提交失败，请稍后再试。',
      ch_reward_label:'奖励特典',
      ch_reward_title:'优秀帖子赢得<span style="background:rgba(255,255,255,.2);border-radius:6px;padding:1px 8px">Wehome免费住宿</span>',
      ch_reward_sub:'上传你的韩文挑战照片或视频吧！',
      ch_reward_btn:'立即提交'
    },
    id: {
      nav_home:'HOME', nav_about:'K-POPSTAY', nav_guide:'Panduan Tamu', nav_apply:'Tantangan Borahae ›',
      hero_eyebrow:'K-POPSTAY BUSAN 2026',
      hero_title:'<span class="brand">Sarang Camar</span><br>Busan',
      hero_subtitle:'Sambutan Ungu untuk Penggemar Global,<br>Dipersembahkan oleh Warga Busan.',
      hero_city:'Busan — 12–14 Jun',
      hero_cta:'Lihat Tantangan Borahae &amp; Ulasan ›',
      hero_share:'Bagikan',
      hero_host:'Jadilah Tuan Rumah Warga Busan ›',
      hero_book:'Pesan Akomodasi Wehome Busan Diskon 10% ›',
      hero_homestay:'Homestay Warga Busan di Wehome ›',
      fab:'Lihat Tantangan Borahae &amp; Ulasan ›',
      intro_tag:'Tata Kelola Sipil yang Adil &amp; Berbasis Komunitas',
      intro_title:'Sarang Camar<br>Busan',
      intro_h3:'Tentang Proyek Ini',
      intro_p:'Ketika BTS mengumumkan konser comeback Busan 2026, harga akomodasi di Busan melonjak drastis — beberapa listing bahkan mencapai 10x harga normal. Praktik ini memaksa penggemar biasa untuk memilih antara membayar mahal atau melewatkan konser.<br><br>K-POPSTAY BUSAN adalah jawaban kami: sebuah inisiatif sipil yang menghubungkan penggemar ARMY dengan tuan rumah warga Busan yang membuka rumah mereka secara adil tanpa mengeksploitasi momen ini. Semua menginap gratis untuk tamu, dengan sistem pengembalian deposit penuh untuk memastikan kepercayaan kedua belah pihak.<br><br>Ini bukan amal — ini komunitas. Warga Busan maju ke depan untuk berkata: <em>\"Anda disambut di sini.\"</em>',
      whatis_eyebrow:'K-POPSTAY BUSAN',
      whatis_title:'Apa itu K-POPSTAY BUSAN?',
      card01_num:'01', card01_title:'Tuan Rumah Terverifikasi dan Terpercaya',
      card01_desc:'Setiap tuan rumah adalah warga Busan terverifikasi yang telah melalui seleksi platform Wehome. Tamu dapat memesan dengan yakin karena tuan rumah mereka nyata, bertanggung jawab, dan bersemangat komunitas.',
      card02_num:'02', card02_title:'Deposit Keamanan 100% Dapat Dikembalikan',
      card02_desc:'Tamu ARMY terpilih diwajibkan membayar deposit keamanan sebesar KRW 50.000 per orang. Saat check-in, seluruh deposit akan dikembalikan dalam bentuk Kartu Hadiah Wisata Busan. Kartu Hadiah Wisata Busan dapat digunakan seperti uang tunai di merchant yang berpartisipasi di seluruh Busan.',
      about_eyebrow:'Tentang',
      about_title:'Model Berbagi Rumah Baru<br>Bertenaga K-POP',
      about_desc:'Konser comeback BTS 2026 di Busan telah menginspirasi puluhan ribu penggemar di seluruh dunia untuk bepergian ke Korea. K-POPSTAY adalah program sipil pertama yang mengubah semangat penggemar menjadi gerakan komunitas.',
      about_g1_title:'Untuk Tamu', about_g1_desc:'ARMY internasional mendapatkan tempat menginap yang aman, terverifikasi, dan gratis selama konser — diselenggarakan oleh warga Busan nyata yang ingin berbagi kota dan budaya mereka.',
      about_g2_title:'Untuk Tuan Rumah', about_g2_desc:'Warga Busan berbagi rumah, bertemu penggemar global, dan berkontribusi pada gerakan komunitas. Tuan rumah menerima pengakuan dan dukungan melalui platform Wehome.',
      about_g3_title:'Untuk Masyarakat', about_g3_desc:'Model baru untuk pariwisata acara — yang mengutamakan keadilan, komunitas, dan pertukaran budaya daripada keuntungan. Cetak biru untuk acara K-POP masa depan di seluruh dunia.',
      guide_eyebrow:'Panduan Tamu', guide_title:'Semua yang Perlu Anda Ketahui',
      guide_link_title:'Baca Panduan Tamu',
      guide_link_sub:'Aturan hunian · Kebijakan deposit · Check-in · Dukungan',
      guide_label:'Kebijakan K-POPSTAY Busan', guide_h3:'Biaya Menginap &amp; Kebijakan Deposit',
      guide_cost:'Biaya Tamu: KRW 0',
      guide_p:'Menginap Anda sepenuhnya gratis. K-POPSTAY BUSAN adalah inisiatif sipil — tuan rumah warga Busan secara sukarela membuka rumah mereka untuk ARMY global tanpa biaya.',
      guide_highlight:'Deposit Keamanan yang Dapat Dikembalikan: Deposit kecil dikumpulkan saat pemesanan untuk memastikan komitmen bersama. 100% dikembalikan saat checkout tanpa syarat.<br><br>Jika kami tidak dapat menyediakan Kartu Hadiah Wisata Busan, deposit Anda akan dikembalikan secara otomatis ke metode pembayaran asli Anda setelah menginap.',
      guide2_h3:'Aturan Hunian',
      perk1_title:'Dilarang Merokok — 금연', perk1_desc:'Merokok di dalam rumah dan di sekitar area hunian dilarang keras setiap saat.',
      perk2_title:'Dilarang Memasak — 취사 금지', perk2_desc:'Memasak dan menggunakan peralatan dapur tidak diperbolehkan selama menginap.',
      perk3_title:'Waktu Check-in &amp; Check-out — 호스트별 별도 지정', perk3_desc:'Waktu check-in dan check-out ditentukan oleh masing-masing tuan rumah. Harap konfirmasi langsung dengan tuan rumah Anda setelah pemesanan.',
      partners_eyebrow:'Mitra &amp; Pendukung', partners_title:'Didukung oleh Pemerintah &amp; Industri',
      sched_eyebrow:'Jadwal', sched_title:'Timeline K-POPSTAY BUSAN',
      sched_desc:'Jadwal program tamu resmi. <a href="/host">Lihat jadwal tuan rumah &rarr;</a>',
      tl1_date:'29 Mei 2026', tl1_h4:'Pendaftaran Dibuka', tl1_p:'Pendaftaran tamu resmi dibuka. Prioritas diberikan kepada ARMY internasional.', tl1_badge:'Sekarang Buka',
      tl2_date:'6–7 Jun 2026', tl2_h4:'Seleksi Tamu &amp; Pengumuman Pasangan', tl2_p:'Tamu terpilih diberitahu dan dipasangkan dengan tuan rumah warga Busan terverifikasi.',
      tl3_date:'8 Jun 2026', tl3_h4:'Hasil Pasangan &amp; Pengiriman Itinerary', tl3_p:'Detail menginap lengkap, perkenalan tuan rumah, dan itinerary dikirimkan kepada tamu yang dikonfirmasi.',
      tl4_date:'12–14 Jun 2026 · 2 malam', tl4_h4:'Periode Menginap &amp; Pengembalian Deposit', tl4_p:'Tamu menginap bersama keluarga tuan rumah Busan selama periode konser. Deposit dikembalikan penuh saat checkout.',
      contact_eyebrow:'Hubungi Kami', contact_title:'Berhubungan',
      contact1_h3:'Channel Talk', contact1_p:'Chat dengan tim dukungan kami secara real-time melalui Channel Talk — respons tercepat.',
      contact2_h3:'Email', contact2_p1:'<a href="mailto:cs@wehome.me">cs@wehome.me</a>', contact2_p2:'Kami merespons dalam 1 hari kerja.',
      contact3_h3:'Telepon', contact3_p1:'<a href="tel:15445665">1544-5665</a>', contact3_p2:'Hari Kerja 10:00–12:00, 13:00–18:00',
      footer_host:'Pendaftaran Tuan Rumah',
      footer_cs:'Dukungan Pelanggan',
      about_nav_apply:'Daftar Sekarang ›',
      about_hero_eyebrow:'Tentang K-POPSTAY',about_hero_title:'K-POPSTAY',
      about_hero_sub:'Model berbagi rumah baru bertenaga K-POP — menghubungkan penggemar dari seluruh dunia dengan tuan rumah lokal untuk pengalaman menginap yang benar-benar istimewa.',
      about_ov_eyebrow:'Tentang Layanan',about_ov_title:'Apa itu K-POPSTAY?',
      about_ov_desc:'K-POPSTAY adalah layanan berbagi rumah jenis baru dari Wehome yang menghubungkan penggemar K-POP global dengan penggemar lokal, memecahkan tantangan akomodasi sambil menciptakan pertukaran budaya yang bermakna.',
      about_ov_label1:'Tujuan',about_ov_p1:'K-POPSTAY dibuat untuk mengatasi kekurangan akomodasi yang parah dan praktek harga yang melambung tinggi saat konser K-POP besar. Penggemar lokal, warga biasa, tuan rumah berbagi, dan pemerintah daerah bersatu untuk memberikan alternatif yang adil berbasis komunitas.',
      about_ov_label2:'Dukungan Wehome',about_ov_p2:'Wehome menyediakan semua layanan platform dan pencocokan tanpa biaya bagi tuan rumah yang menawarkan rumah mereka secara gratis — memastikan pengalaman tanpa hambatan bagi tuan rumah maupun tamu.',
      about_val_eyebrow:'Nilai Inti',about_val_title:'Nilai untuk Tamu, Tuan Rumah, dan Masyarakat',
      about_val_desc:'K-POPSTAY melampaui akomodasi — menciptakan nilai bermakna bagi penggemar, komunitas lokal, dan masyarakat luas.',
      about_val1_type:'Tamu',about_val1_title:'Pengalaman untuk Penggemar K-POP Global',
      about_val1_li1:'Bertemu penggemar lokal dan rasakan gaya hidup K dari kampung halaman BTS',
      about_val1_li2:'Berbagi rumah berkualitas tinggi yang terverifikasi legal, dijamin Wehome',
      about_val1_li3:'Biaya akomodasi gratis atau sangat terjangkau',
      about_val2_type:'Tuan Rumah',about_val2_title:'Kesempatan Istimewa bagi Tuan Rumah',
      about_val2_li1:'Kesempatan langka bertemu dan terhubung langsung dengan penggemar K-POP global',
      about_val2_li2:'Mulai berbagi rumah dengan aman melalui dukungan hukum (program percontohan)',
      about_val2_li3:'Berkontribusi menyebarkan K-Lifestyle sebagai duta budaya antar masyarakat',
      about_val3_type:'Sosial',about_val3_title:'Menciptakan Nilai Sosial',
      about_val3_li1:'Mengatasi harga yang melambung tinggi di acara besar melalui alternatif berbasis komunitas',
      about_val3_li2:'Memenuhi permintaan wisatawan global akan pengalaman K-Lifestyle yang autentik',
      about_val3_li3:'Mengembalikan manfaat ekonomi langsung kepada penduduk lokal dengan memanfaatkan hunian yang ada',
      about_host_eyebrow:'Partisipasi Tuan Rumah',about_host_title:'Siapa Saja Bisa Menjadi Tuan Rumah',
      about_host_desc:'Penggemar K-POP, warga lokal, dan tuan rumah Wehome yang sudah ada di area konser semua dipersilakan berpartisipasi.',
      about_hcard1_badge:'Tuan Rumah Penggemar',about_hcard1_title:'Tuan Rumah Penggemar',
      about_hcard1_p:'Penggemar mana pun yang ingin menyambut penggemar K-POP global dapat mendaftar. Tuan rumah yang menyediakan rumah mereka secara gratis tidak memerlukan pendaftaran berbagi rumah terpisah. Tamu membayar biaya hidup harian yang sepenuhnya diteruskan ke tuan rumah.',
      about_hcard2_badge:'Tuan Rumah Warga',about_hcard2_title:'Tuan Rumah Warga',
      about_hcard2_p:'Setiap penduduk kota konser dapat berpartisipasi sebagai tuan rumah. Meskipun tanpa pengalaman berbagi rumah sebelumnya, proses verifikasi dan dukungan Wehome memastikan awal yang aman dan lancar.',
      about_hcard3_badge:'Proyek Khusus',about_hcard3_title:'Proyek Sarang Camar Busan',
      about_hcard3_p:'Sebagai bagian dari K-POPSTAY BUSAN 2026, warga Busan membuka rumah mereka untuk penggemar K-POP global secara gratis — proyek yang dikembangkan bersama Kota Busan.',
      about_hcard4_badge:'Tuan Rumah Wehome',about_hcard4_title:'Tuan Rumah Wehome yang Sudah Ada',
      about_hcard4_p:'Tuan rumah yang sudah terdaftar di Wehome juga berhak berpartisipasi. Pemilihan mempertimbangkan penilaian listing yang ada dan kebijakan harga.',
      about_qualify_label:'Kelayakan',
      about_qualify_p:'Pendaftaran terbuka untuk tuan rumah penggemar yang menawarkan akomodasi gratis, atau tuan rumah yang terdaftar dalam program percontohan berbagi rumah Wehome.',
      about_proc_eyebrow:'Cara Kerja',about_proc_title:'Proses Pencocokan',
      about_proc_desc:'Dari pendaftaran hingga check-out, Wehome mendukung setiap langkahnya.',
      about_step1_title:'Pendaftaran & Seleksi Tuan Rumah',about_step1_desc:'Setelah tuan rumah mendaftar, Wehome meninjau dokumen dan melakukan kunjungan lapangan untuk mengevaluasi keamanan, kebersihan, dan kepatuhan hukum sebelum memilih listing.',
      about_step2_title:'Pendaftaran Tamu',about_step2_desc:'Tamu mendaftar lebih awal melalui platform Wehome, menentukan gaya akomodasi dan tanggal yang diinginkan.',
      about_step3_title:'Pencocokan & Seleksi',about_step3_desc:'Tuan rumah dapat langsung memilih tamu yang ingin mereka sambut dari kumpulan pelamar.',
      about_step3_note:'Jika didelegasikan ke Wehome, pencocokan dilakukan berdasarkan urutan kedatangan atau undian.',
      about_step4_title:'Aturan Operasi Tuan Rumah Penggemar',about_step4_desc:'Tuan rumah penggemar yang menawarkan ruang secara gratis tidak perlu mendaftar sebagai bisnis berbagi rumah formal. Namun, tamu harus membayar biaya hidup harian yang sepenuhnya diteruskan ke tuan rumah.',
      about_step5_title:'Program Percontohan & Batas Tarif',about_step5_desc:'Wehome memberikan dukungan pendaftaran cepat bagi tuan rumah yang memerlukan pendaftaran dalam program percontohan berbagi rumah non-residen.',
      about_step5_note:'Dalam hal ini, tarif dibatasi tidak lebih dari 2× tarif berbagi rumah sebanding dari periode yang sama tahun sebelumnya.',
      about_contact_eyebrow:'Kontak',about_contact_title:'Ada Pertanyaan?',
      about_contact_desc:'Jangan ragu menghubungi kami kapan saja tentang pendaftaran tuan rumah atau cara kerja layanan ini.',
      about_cc1_name:'Live Chat',about_cc1_val:'Chat langsung dengan kami melalui website Wehome',
      about_cc2_name:'Telepon',about_cc2_val:'1544-5665<br>Senin–Jumat 10:00–18:00 KST<br><span style="font-size:0.78rem;color:var(--text-300)">(Kecuali makan siang 12:00–13:00 / Libur akhir pekan & hari libur)</span>',
      about_back:'← Kembali ke Beranda',
      apply_back:'← Kembali',
      apply_eyebrow:'PENDAFTARAN TAMU',
      apply_title:'Daftar Menginap Gratis',
      apply_sub:'Prioritas ARMY internasional. 12–14 Jun, Busan.',
      apply_form_h2:'Formulir Pendaftaran Tamu',
      apply_form_sub:'Konser Busan · 12–14 Jun 2026 · Powered by Wehome',
      apply_step1:'Preferensi Menginap', apply_step2:'Info Pribadi', apply_step3:'Verifikasi ARMY',
      apply_sec1:'Preferensi Menginap', apply_sec2:'Info Pribadi', apply_sec3:'Verifikasi ARMY',
      apply_stay_type:'Tipe Akomodasi',
      apply_private_title:'Kamar Pribadi', apply_private_desc:'Kamar mandiri',
      apply_shared_title:'Kamar Bersama', apply_shared_desc:'Berbagi dengan tamu lain',
      apply_flex_title:'Fleksibel', apply_flex_desc:'Tidak ada preferensi',
      apply_err_stay:'Silakan pilih tipe akomodasi.',
      apply_guest_count:'Jumlah Tamu',
      apply_count_placeholder:'Pilih jumlah tamu',
      apply_count_1:'1 orang', apply_count_2:'2 orang', apply_count_3:'3 orang', apply_count_4:'4 orang',
      apply_err_count:'Silakan pilih jumlah tamu.',
      apply_gender:'Jenis Kelamin',
      apply_female:'Perempuan', apply_male:'Laki-laki', apply_other:'Lainnya',
      apply_err_gender:'Silakan pilih jenis kelamin.',
      apply_bed:'Perlu Tempat Tidur Sendiri?',
      apply_bed_yes:'Ya', apply_bed_no:'Tidak (bisa lantai)',
      apply_err_bed:'Silakan pilih preferensi tempat tidur.',
      apply_checkin:'Tanggal Check-in', apply_checkout:'Tanggal Check-out',
      apply_date_placeholder:'Pilih tanggal',
      apply_date_note:'Jika ada keadaan khusus, Anda dapat menyesuaikan tanggal.',
      apply_err_checkin:'Silakan pilih tanggal check-in.',
      apply_err_checkout:'Silakan pilih tanggal check-out.',
      apply_name:'Nama Lengkap', apply_name_placeholder:'Nama lengkap Anda',
      apply_err_name:'Silakan masukkan nama Anda.',
      apply_nationality:'Negara/Wilayah',
      apply_nationality_placeholder:'Pilih Negara/Wilayah',
      apply_err_nationality:'Silakan pilih kewarganegaraan.',
      apply_phone:'Nomor Telepon', apply_phone_placeholder:'Nomor telepon',
      apply_err_phone:'Silakan masukkan nomor telepon.',
      apply_email:'Alamat Email', apply_email_placeholder:'your@email.com',
      apply_err_email:'Silakan masukkan email yang valid.',
      apply_languages:'Bahasa yang Dikuasai',
      apply_err_language:'Pilih setidaknya satu bahasa.',
      apply_army_method:'Metode Bukti ARMY',
      apply_weverse_title:'Weverse', apply_weverse_desc:'Screenshot keanggotaan Weverse',
      apply_ticket_title:'Tiket Konser', apply_ticket_desc:'Konfirmasi pembelian',
      apply_fanclub_title:'Komunitas Fan', apply_fanclub_desc:'Postingan fan club/komunitas',
      apply_err_army:'Silakan pilih metode bukti.',
      apply_upload:'Unggah File Bukti',
      apply_upload_click:'Klik untuk mengunggah atau seret & lepas',
      apply_upload_size:'PNG, JPG, PDF — maks 10MB',
      apply_err_file:'Silakan unggah file bukti.',
      apply_wehome_id:'Wehome ID (opsional)',
      apply_wehome_placeholder:'ID akun Wehome Anda (jika ada)',
      apply_comments:'Komentar Tambahan (opsional)',
      apply_comments_placeholder:'Permintaan khusus atau pesan untuk tuan rumah Anda...',
      apply_referral_label:'Bagaimana Anda mengetahui K-POPSTAY?',
      apply_referral_theqoo:'더쿠 (Theqoo)', apply_referral_naver:'Naver (Blog/Cafe)',
      apply_referral_visitkorea:'VisitKorea', apply_referral_fan_community:'Komunitas Fan',
      apply_referral_friend:'Teman / Rekomendasi', apply_referral_baovanhoa:'Báo Văn Hóa (Vietnam)',
      apply_referral_kmmbox:'Korea.kr / KMMBOX',
      apply_deposit_title:'Kebijakan Deposit Keamanan',
      apply_deposit_body:'Tamu ARMY terpilih diwajibkan membayar deposit <strong>KRW 50.000 per orang</strong>. Saat check-in, deposit dikembalikan dalam bentuk <strong>Kartu Hadiah Wisata Busan</strong>.<br><br>Jika kami tidak dapat menyediakan Kartu Hadiah Wisata Busan, deposit Anda akan dikembalikan secara otomatis ke metode pembayaran asli Anda setelah menginap.',
      apply_agree_project:'Saya mengonfirmasi bahwa ini adalah formulir pendaftaran untuk akomodasi gratis melalui <strong>Proyek Sarang Camar Busan K-POPSTAY BUSAN 2026</strong>. Jika diterima, saya memahami dan menyetujui ketentuan berikut.',
      apply_err_project:'Silakan konfirmasi pernyataan di atas.',
      apply_agree_deposit:'Saya memahami dan menyetujui <strong>kebijakan deposit KRW 50.000</strong>. Saya mengakui bahwa deposit akan dikembalikan penuh sebagai Kartu Hadiah Wisata Busan saat check-in.',
      apply_err_deposit:'Silakan setujui kebijakan deposit.',
      apply_agree_terms:'Saya setuju dengan <a href="#" onclick="return false">Ketentuan Layanan</a> dan <a href="#" onclick="return false">Kebijakan Privasi</a>.',
      apply_err_agree:'Silakan setujui ketentuan.',
      apply_btn_back:'← Kembali', apply_btn_continue:'Lanjutkan →', apply_btn_submit:'Kirim Pendaftaran', apply_btn_submitting:'Mengirim...',
      apply_success_title:'Pendaftaran Terkirim!',
      apply_success_desc:'Terima kasih telah mendaftar K-POPSTAY BUSAN 2026.<br>Kami akan meninjau pendaftaran Anda dan memberitahu pada <strong>6–7 Jun 2026</strong>.<br><br>Periksa email Anda untuk konfirmasi. Prioritas diberikan kepada ARMY internasional.',
      apply_closed_msg:'Terima kasih atas antusiasme luar biasa dari para tamu ARMY di seluruh dunia.<br>Kami akan menyeleksi ARMY global dan mencocokkan mereka dengan ARMY host serta citizen host untuk mengatur pemesanan akomodasi.<br>ARMY terpilih akan diberitahu hasilnya melalui email.<br><br>Terima kasih atas dukungan hangat kalian, ARMY!',
      apply_closed_title:'Pendaftaran Ditutup',
      apply_closed_sub:'K-POPSTAY BUSAN 2026 · Terima kasih, ARMY!',
      ch_nav:'Tantangan Borahae',
      ch_hero_eyebrow:'위홈 웰컴레터 & 보라해 한글 챌린지',
      ch_hero_title:'Wehome <span class="brand">Surat Selamat Datang</span><br>&amp; Galeri<br>Menginap Busan',
      ch_hero_p:'Bagikan momen K-POPSTAY Busan di Instagram — tulis <strong>보라해</strong> di Surat Selamat Datang, foto penginapan, petualangan Busan bersama host, apa saja boleh!',
      ch_poster_eyebrow:'Tantangan Hangul Borahae',
      ch_poster_title:'Buat Seni Hangul Milikmu',
      ch_poster_desc:'Host akan memberikan <strong>lembar stiker Hangul Borahae Wehome</strong> saat kamu tiba — gunakan untuk menulis namamu, member BTS favoritmu, atau kata Korea apa pun yang kamu suka. Tidak perlu bisa bahasa Korea!',
      ch_event_loc:'Bally Aqua Land · 12–13 Juni',
      ch_event_s1_title:'Temukan Botari',
      ch_event_s1_desc:'Periksa loker wanita — temukan <em>Kit Hangul Borahae</em> atau <em>Hadiah Botari Wehome</em> yang tersembunyi, dan itu milikmu!',
      ch_event_s2_title:'Tantangan Dinding Hangul',
      ch_event_s2_desc:'Gunakan stiker untuk menempel namamu atau pesan di dinding yang ditentukan.',
      ch_event_s3_title:'Bagikan &amp; Unggah',
      ch_event_s3_desc:'Posting di Instagram dengan <button onclick="copyHashtag(\'#KPOPSTAYBusan\')" class="poster-hashtag-btn">#KPOPSTAYBusan</button> <button onclick="copyHashtag('#wehome')" class="poster-hashtag-btn">#wehome</button>, lalu kirimkan ke galeri!',
      ch_event_prizes_label:'Hadiah:',
      ch_event_prize1:'Kit Hangul Borahae × 8–9',
      ch_event_prize2:'Hadiah Botari Wehome × 2',
      ch_gallery_eyebrow:'Galeri Komunitas',
      ch_gallery_title:'Galeri Menginap Busan',
      ch_gallery_desc:'ARMY dari seluruh dunia berbagi momen K-POPSTAY Busan — Surat Selamat Datang, kenangan menginap, dan petualangan Busan bersama host.',
      ch_gallery_share:'Bagikan Postingan',
      ch_gallery_counter_label:'kenangan dibagikan dari Busan',
      ch_gallery_filter_all:'Semua',
      ch_gallery_filter_insta:'SNS',
      ch_gallery_filter_upload:'Unggah Foto',
      ch_gallery_loadmore:'Muat Lebih ›',
      ch_empty_title1:'Seni Hangul Milikmu',
      ch_empty_desc1:'Tulis kata Korea dengan stiker dan ambil foto',
      ch_empty_title2:'Posting &amp; Tag',
      ch_empty_desc2:'Bagikan di Instagram dengan <strong style="color:var(--purple)">#KPOPSTAYBusan</strong>',
      ch_empty_title3:'Bergabung ke Galeri',
      ch_empty_desc3:'Kirim linkmu — postinganmu akan muncul di galeri yang dilihat ARMY seluruh dunia',
      ch_empty_cta:'Jadilah <strong>ARMY pertama</strong> yang meninggalkan kenangan di sini.<br>Postinganmu akan menjadi yang pertama dilihat semua orang.',
      ch_modal_eyebrow:'Bagikan Ceritamu',
      ch_modal_title:'Kirim Postingan',
      ch_modal_tab_insta:'Link Instagram',
      ch_modal_tab_upload:'Unggah Foto',
      ch_modal_insta_sub:'Tempel link postingan Instagram kamu — setelah ditinjau akan muncul di galeri!',
      ch_modal_insta_url_label:'URL Postingan Instagram',
      ch_modal_name_label:'Namamu (opsional)',
      ch_modal_name_ph:'contoh: ARMY_Indonesia',
      ch_modal_email_label:'Email (opsional)',
      ch_modal_note_label:'Pesan untuk hostmu (opsional)',
      ch_modal_note_ph:'보라해！Terima kasih sudah membuka rumahmu...',
      ch_modal_btn_insta:'Kirim Postingan ›',
      ch_modal_upload_sub:'Tidak punya Instagram? Unggah foto langsung — seni hangul, kenangan menginap, momen Busan, apa saja!',
      ch_modal_photo_label:'Foto',
      ch_modal_photo_up_to:'hingga 5 foto',
      ch_modal_photo_tap:'<strong>Ketuk untuk memilih foto</strong>',
      ch_modal_photo_hint:'Hingga 5 foto · JPG, PNG, WEBP, GIF · maks 10MB per foto',
      ch_modal_caption_label:'Keterangan (opsional)',
      ch_modal_caption_ph:'보라해！Ini seni Hangul yang kubuat di Busan...',
      ch_modal_upload_note_label:'Pesan untuk hostmu (opsional)',
      ch_modal_btn_upload:'Unggah &amp; Kirim ›',
      ch_alert_ok_title:'Berhasil!',
      ch_alert_err_title:'Kesalahan',
      ch_alert_confirm:'OK',
      ch_msg_ok_insta:'Berhasil dikirim! Akan muncul di galeri setelah ditinjau.',
      ch_msg_ok_upload_photo:'Foto berhasil dikirim! Akan muncul setelah ditinjau.',
      ch_msg_ok_upload_video:'Video berhasil dikirim! Akan muncul setelah ditinjau.',
      ch_msg_err_no_photo:'Silakan pilih minimal satu foto.',
      ch_msg_err_no_video:'Silakan pilih file video.',
      ch_msg_err_network:'Kesalahan jaringan. Coba lagi.',
      ch_msg_err_dup:'Postingan ini sudah pernah dikirim.',
      ch_msg_err_limit:'Batas pengiriman harian tercapai.',
      ch_msg_err_url:'Masukkan URL Instagram yang valid.',
      ch_msg_err_fail:'Pengiriman gagal. Coba lagi nanti.',
      ch_reward_label:'Hadiah Spesial',
      ch_reward_title:'Posting terbaik menangkan <span style="background:rgba(255,255,255,.2);border-radius:6px;padding:1px 8px">menginap GRATIS di Wehome</span>',
      ch_reward_sub:'Unggah foto atau video tantangan Hangul-mu!',
      ch_reward_btn:'Kirim Sekarang'
    }
  };

  // t() : 현재 언어 번역 조회
  window.kpopT = function(key){
    var lang = window.KPOP_LANG || 'en';
    return (T[lang] && T[lang][key] !== undefined) ? T[lang][key] : (T.en[key] || key);
  };

  // 언어 변경 함수
  window.kpopSetLang = function(lang){
    if(SUPPORTED.indexOf(lang)<0) return;
    setCookie(COOKIE_NAME, lang);
    location.reload();
  };

  // 드롭다운 토글
  window.toggleKpopLang = function(e){
    e.stopPropagation();
    var d = document.getElementById('kpopLangDropdown');
    if(!d) return;
    var open = d.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open);
  };

  // 외부 클릭 시 닫기
  document.addEventListener('click', function(){
    var d = document.getElementById('kpopLangDropdown');
    if(d) d.classList.remove('open');
    var btn = document.querySelector('.kpop-lang-btn');
    if(btn) btn.setAttribute('aria-expanded','false');
  });

  // 현재 언어 설정
  var lang = detectLang();
  window.KPOP_LANG = lang;
  window.KPOP_LANG_LABEL = LABELS[lang] || 'EN';
  window.KPOP_LANG_LABELS = LABELS;
  window.KPOP_SUPPORTED = SUPPORTED;

  // DOM 준비 후 페이지 번역 적용
  function applyTranslations(){
    var t = window.kpopT;
    function set(id, html){ var el=document.getElementById(id); if(el) el.innerHTML=html; }
    function q(sel, html){ var el=document.querySelector(sel); if(el) el.innerHTML=html; }
    function qa(sel, html){ var els=document.querySelectorAll(sel); els.forEach(function(el){el.innerHTML=html;}); }

    // html lang
    document.documentElement.lang = lang==='zh_t'?'zh-TW':lang==='zh_s'?'zh-CN':lang==='ja'?'ja':lang==='id'?'id':'en';

    // NAV
    q('a[href="#home"].nav-link', t('nav_home'));
    q('a[href="/about"].nav-link', t('nav_about'));
    q('a[href="#guidebook"].nav-link', t('nav_guide'));
    q('.btn-apply-nav', t('nav_apply'));
    // mobile menu
    q('#mobileMenu a[href="#home"]', t('nav_home'));
    q('#mobileMenu a[href="/about"]', t('nav_about'));
    q('#mobileMenu a[href="#guidebook"]', t('nav_guide'));
    q('#mobileMenu a[href="apply.html"].mobile-link', t('nav_apply'));

    // HERO
    q('.hero-eyebrow', t('hero_eyebrow'));
    q('.hero-title', t('hero_title'));
    q('.hero-subtitle', t('hero_subtitle'));
    q('.city-badge', t('hero_city'));
    q('.hero-apply-btn', t('hero_cta'));
    q('.btn-share', t('hero_share'));
    q('.hero-sub-link:first-child', t('hero_host'));
    q('.hero-sub-link[href*="k-popstay-busan"]', t('hero_book'));
    q('.hero-sub-link[href*="k-popstay-homestay"]', t('hero_homestay'));
    set('fabApply', t('fab'));

    // INTRODUCE
    q('.intro-tag', t('intro_tag'));
    q('.intro-title', t('intro_title'));
    q('.intro-right h3', t('intro_h3'));
    q('.intro-right p', t('intro_p'));

    // WHATIS
    q('.whatis-header .section-eyebrow', t('whatis_eyebrow'));
    q('.whatis-header .section-title', t('whatis_title'));
    var cards = document.querySelectorAll('.whatis-card');
    if(cards[0]){
      cards[0].querySelector('.card-num').textContent = t('card01_num');
      cards[0].querySelector('.card-title').textContent = t('card01_title');
      cards[0].querySelector('.card-desc').textContent = t('card01_desc');
    }
    if(cards[1]){
      cards[1].querySelector('.card-num').textContent = t('card02_num');
      cards[1].querySelector('.card-title').textContent = t('card02_title');
      cards[1].querySelector('.card-desc').textContent = t('card02_desc');
    }

    // ABOUT
    q('#about .section-eyebrow', t('about_eyebrow'));
    q('#about .section-title', t('about_title'));
    q('.about-desc', t('about_desc'));
    var acards = document.querySelectorAll('.about-card');
    if(acards[0]){ acards[0].querySelector('h3').textContent=t('about_g1_title'); acards[0].querySelector('p').textContent=t('about_g1_desc'); }
    if(acards[1]){ acards[1].querySelector('h3').textContent=t('about_g2_title'); acards[1].querySelector('p').textContent=t('about_g2_desc'); }
    if(acards[2]){ acards[2].querySelector('h3').textContent=t('about_g3_title'); acards[2].querySelector('p').textContent=t('about_g3_desc'); }

    // GUIDEBOOK
    q('#guidebook .section-eyebrow', t('guide_eyebrow'));
    q('#guidebook .section-title', t('guide_title'));
    set('guide_link_title', t('guide_link_title'));
    set('guide_link_sub', t('guide_link_sub'));

    // PARTNERS
    q('#partners .section-eyebrow', t('partners_eyebrow'));
    q('#partners .section-title', t('partners_title'));

    // SCHEDULE
    q('#schedule .section-eyebrow', t('sched_eyebrow'));
    q('#schedule .section-title', t('sched_title'));
    q('.schedule-desc', t('sched_desc'));
    var tls = document.querySelectorAll('.tl-item');
    var tlkeys = [
      ['tl1_date','tl1_h4','tl1_p','tl1_badge'],
      ['tl2_date','tl2_h4','tl2_p',null],
      ['tl3_date','tl3_h4','tl3_p',null],
      ['tl4_date','tl4_h4','tl4_p',null]
    ];
    tls.forEach(function(item, i){
      if(!tlkeys[i]) return;
      var dk = item.querySelector('.tl-date'); if(dk) dk.textContent = t(tlkeys[i][0]);
      var h4 = item.querySelector('h4'); if(h4) h4.innerHTML = t(tlkeys[i][1]);
      var p  = item.querySelector('.tl-content p'); if(p) p.textContent = t(tlkeys[i][2]);
      if(tlkeys[i][3]){
        var badge = item.querySelector('.tl-badge-open'); if(badge) badge.innerHTML = '<span class="tl-badge-dot"></span>'+t(tlkeys[i][3]);
      }
    });

    // CONTACT
    q('#contact .section-eyebrow', t('contact_eyebrow'));
    q('#contact .section-title', t('contact_title'));
    var ccards = document.querySelectorAll('.contact-card');
    if(ccards[0]){ ccards[0].querySelector('h3').textContent=t('contact1_h3'); ccards[0].querySelector('p').innerHTML=t('contact1_p'); }
    if(ccards[1]){
      ccards[1].querySelector('h3').textContent=t('contact2_h3');
      var ps1=ccards[1].querySelectorAll('p'); if(ps1[0])ps1[0].innerHTML=t('contact2_p1'); if(ps1[1])ps1[1].textContent=t('contact2_p2');
    }
    if(ccards[2]){
      ccards[2].querySelector('h3').textContent=t('contact3_h3');
      var ps2=ccards[2].querySelectorAll('p'); if(ps2[0])ps2[0].innerHTML=t('contact3_p1'); if(ps2[1])ps2[1].textContent=t('contact3_p2');
    }

    // FOOTER
    q('a[href="/host"].footer-link', t('footer_host'));
    q('a[href="mailto:cs@wehome.me"].footer-link', t('footer_cs'));
  }

  // guest-guidebook.html 전용 번역 딕셔너리
  var GGB = {
    ko: {
      title: '게스트 가이드북 — K-POPSTAY BUSAN 2026',
      eyebrow: 'Guest Guidebook',
      page_title: '알아야 할 모든 것',
      page_sub: 'K-POPSTAY BUSAN 2026 · 게스트 약관 & 이용 규칙',
      notice_title: '전제 사항 / Notice',
      notice_body: '본 가이드는 위홈 공유숙박 사용자 약관에 우선적으로 적용됩니다. 여기에서 언급되지 않은 사항은 위홈의 사용자 약관을 따릅니다.',
      notice_body_en: 'This guide takes precedence over Wehome\'s general Terms of Service. Any matters not addressed here are governed by Wehome\'s standard Terms of Service.',
      intro_label: '인사말 및 소개',
      intro_title: 'K-POPSTAY BUSAN 2026 소개',
      intro_p1: 'K-POPSTAY BUSAN 2026은 부산 아미와 시민들의 참여를 바탕으로 부산시와 위홈 공유숙박 플랫폼이 진행합니다. 글로벌 아미와 부산의 아미 및 시민을 연결해서 글로벌 아미의 숙박 문제를 다소라도 해결해 드리고 상호 교류를 돕기 위한 프로젝트입니다.',
      intro_p2: '부산시도, 위홈도, 시민들도 모두 자발적인 참여로 진행됩니다. 특히 이번 K-POPSTAY BUSAN 2026은 부산의 아미와 시민이 자발적으로 나서서 BTS 글로벌 아미를 위해 아무런 대가 없이 기꺼이 숙소를 내어주는 것입니다.',
      intro_p3: '촉박한 상황에서 적극적인 협조로 진행되는 만큼 아미 여러분의 협조와 호스트에 대한 감사, 그리고 존중의 자세가 필요합니다. 시간적 제약으로 다소 부족한 점이 있을 수 있으니 너그러이 이해해 주시기 바랍니다.',
      intro_p4: '위홈은 앞으로도 K-POPSTAY를 보완해서 글로벌 K-POP 팬들의 숙소 문제를 해결할 수 있도록 더욱 노력하겠습니다.',
      sched_label: '주요일정',
      sched_title: 'Key Schedule',
      sched_date1: '6/7',
      sched_item1: '<strong>2026년 6월 7일까지</strong><br>글로벌 아미 게스트 신청 (자정에 신청 마감) / 게스트 및 호스트 매칭 개시',
      sched_date2: '6/8',
      sched_item2: '<strong>2026년 6월 8일까지</strong><br>게스트 및 호스트 숙소 매칭 완료, 예약 진행 개시<br><span style="color:var(--text-300);font-size:0.82rem">(추가 호스트 등록 시 추가 매칭 및 예약 진행)</span>',
      sched_date3: '6/10',
      sched_item3: '<strong>2026년 6월 10일</strong><br>호스트 대상 설명회 (부산시청) 진행 — 위홈 참석, 아미 배포할 웰컴홈위홈 백 전달 예정',
      sched_date4: '6/12',
      sched_item4: '<strong>2026년 6월 12일부터</strong><br>아미 체크인 (일부 호스트와 협의 하에 6월 11일부터 진행)<br>체크인 시 아미 개인별 <strong>5만원 부산관광상품권</strong> 및 웰컴홈 기프트백 제공<br>아미 게스트 챌린지 참여: <strong>#보라해한글</strong> 및 호스트와 사진 촬영 & SNS 공유',
      sched_date5: '6/14',
      sched_item5: '<strong>2026년 6월 14일</strong><br>글로벌 아미 체크아웃 / 전체 사업 평가',
      b1_label: '자격 · 숙소형태 · 예약 · 혜택',
      b1_title: 'Eligibility, Booking & Benefits',
      b1_cost: '게스트 비용: 0원',
      b1_r1: '무료 숙박은 BTS 글로벌 아미에 우선 제공됩니다. 아미 확인이 불가한 경우 확약 후에도 취소될 수 있습니다.',
      b1_r2: '보다 많은 아미에게 편의를 제공하기 위해 거실도 방으로 구분해 제공될 수 있습니다. 시설 설명란에 거실임을 명기합니다.',
      b1_r3: '<strong>체크인·체크아웃 시간</strong> — 지정된 시간을 지켜주세요. 호스트가 조정 가능한 경우 유연하게 진행할 수 있습니다.',
      b1_r4: '<strong>보증금 1인당 5만원 (신용카드 결제)</strong> — 체크인 후 5만원 충전 부산관광카드로 전액 환불. 부산 내 가맹점에서 현금처럼 사용 가능 (백화점·대형 쇼핑몰 제외). 확약 후 노쇼 시 환불 불가.',
      b1_r5: '<strong>Welcome Home Wehome 선물 백</strong> — 선착순 100명 무료 제공. 부산시·제나벨(Genabelle) 후원.',
      b1_r6: '<strong>개인 준비물 및 이동</strong> — 세안 도구는 직접 챙겨오셔야 하며, 공연 후 숙소까지의 이동은 직접 하셔야 합니다.',
      b1_r7: '<strong>출입 제한 및 비밀번호 공유 불가</strong> — 사전 매칭된 게스트만 입장 가능. 현관 비밀번호 등 출입 정보는 타인에게 절대 공유 불가.',
      b1_r8: '<strong>관광상품권 전달 불가 시 자동 환급</strong> — 관광상품권 전달이 안되는 경우 숙박 후 보증금은 지불 취소로 자동 환급해드립니다.',
      b2_label: 'House Rules',
      b2_title: '숙소 이용 규칙 및 에티켓',
      b2_r1: '<strong>홈스테이 주의사항</strong> — 부산 시민이 실제 거주하는 공간입니다. 발화 물질 반입 금지. 주인의 사적인 공간이나 물건을 함부로 열거나 사용 금지. 동숙 아미들과 서로 배려해 주세요.',
      b2_r2: '<strong>절대 금연</strong> — 숙소 내부 및 건물 내 항상 금지.',
      b2_r3: '<strong>취사 금지</strong> — 주방 이용 및 조리 기구 사용 불가. (호스트가 문자로 허락한 경우에 한해 예외 가능)',
      b2_r4: '<strong>음주 금지 및 소음 주의</strong> — 숙소 내 음주 엄격 금지. 이웃에게 피해를 주는 소음·가무 절대 삼가.',
      b2_r5: '<strong>시설 훼손 및 배상 책임</strong> — 침구·시설물 훼손 시 복구 및 배상 책임은 게스트에게 있습니다.',
      b2_r6: '<strong>개인정보 보호</strong> — 호스트 연락처 및 상세 숙소 정보는 외부 유출·SNS 공유 절대 금지.',
      b2_r7: '<strong>규칙 위반 시 즉시 퇴실 조치될 수 있습니다.</strong>',
      b3_label: '체크아웃',
      b3_title: '체크아웃 및 쓰레기 분리수거',
      b3_r1: '체크아웃 전, 사용한 모든 물건을 제자리에 놓고 깨끗하게 청소·정리해 주세요.',
      b3_r2: '<strong>쓰레기 분리수거는 필수입니다.</strong>',
      b3_dot3: '일반', b3_r3: '<strong>일반 쓰레기</strong> — 재활용이 되지 않는 쓰레기는 일반 쓰레기로 분류.',
      b3_dot4: '재활', b3_r4: '<strong>재활용품</strong> — 플라스틱류, 캔/고철류, 유리병, 종이류, 비닐류로 종류별로 나누어 지정된 장소·분리수거함에 배출.',
      b3_dot5: '음식', b3_r5: '<strong>음식물 쓰레기</strong> — 물기를 제거한 후 음식물 전용 쓰레기통이나 봉투에 따로 모아주세요.',
      b3_r6: '※ 숙소마다 버리는 방식이 다를 수 있으니, 호스트가 별도로 안내한 방법이 있다면 우선적으로 따라주세요.',
      b3_r7: '<strong>ARMY Challenge</strong> — 호스트와 사진 촬영 후 <strong>#보라해한글</strong> 해시태그로 SNS에 공유해 주세요.',
      sup1: '<strong>안전 관리</strong>이벤트 책임 보험 가입 및 안전 관리 시스템 구축 운영',
      sup2: '<strong>채널톡 (가장 빠름)</strong>위홈 홈페이지 우측 하단 채팅 버튼',
      sup3: '<strong>이메일 · 전화</strong>cs@wehome.me<br>1544-5665 (평일 10–18시)<br><span style="font-size:0.8rem;color:var(--text-300)">부산시민단체협의회: 051-809-2629<br>시청 경제정책과: 051-888-4751</span>',
      emerg_title: '긴급 상황 발생 시',
      emerg_desc: '호스트와 연락이 닿지 않거나 현장에서 긴급 상황이 발생한 경우,<br>아래 버튼을 눌러 위홈 대표 및 부산시 담당자에게 즉시 지원 요청하세요.',
      emerg_btn: '⚠ 긴급 지원 요청하기',
      back: '← 뒤로',
      footer: '(주)위홈 | 대표이사: 조산구 | 개인정보 보호책임자: 김석진 | 사업자등록번호: 467-81-01292 / 서울 마포구 양화로 136 SVCS 507 | 고객센터: 1544-5665 | 평일 10:00&ndash;12:00, 13:00&ndash;18:00<br>© 2026 Wehome Inc. All rights reserved.'
    },
    en: {
      title: 'Guest Guidebook — K-POPSTAY BUSAN 2026',
      eyebrow: 'Guest Guidebook',
      page_title: 'Everything You Need to Know',
      page_sub: 'K-POPSTAY BUSAN 2026 · Guest Terms & House Rules',
      notice_title: 'Notice',
      notice_body: 'This guide takes precedence over Wehome\'s general Terms of Service. Any matters not addressed here are governed by Wehome\'s standard Terms of Service.',
      notice_body_en: 'This guide takes precedence over Wehome\'s general Terms of Service. Any matters not addressed here are governed by Wehome\'s standard Terms of Service.',
      intro_label: 'Introduction & Greetings',
      intro_title: 'About K-POPSTAY BUSAN 2026',
      intro_p1: 'K-POPSTAY BUSAN 2026 is co-hosted by Busan City and Wehome, powered by the voluntary participation of Busan citizens and local K-POP fans. This community program connects global fans with residents to help solve accommodation challenges and foster mutual cultural exchange.',
      intro_p2: 'The program runs entirely on the voluntary efforts of Busan City, Wehome, and our hosts. In particular, hosts are opening their homes free of charge out of pure hospitality for global ARMY fans.',
      intro_p3: 'Since this program relies heavily on goodwill and was organized under tight timelines, we ask for your respect, gratitude, and active cooperation. Please understand if some aspects are not as polished as commercial hotels.',
      intro_p4: 'Wehome will continue to improve K-POPSTAY to help solve accommodation issues for global K-POP fans in the future.',
      sched_label: 'Key Schedule',
      sched_title: 'Key Schedule',
      sched_date1: '6/7',
      sched_item1: '<strong>Until June 7, 2026</strong><br>Global ARMY Guest Applications (Closes at midnight) / Matching begins',
      sched_date2: '6/8',
      sched_item2: '<strong>Until June 8, 2026</strong><br>Guest-Host matching completed & booking begins<br><span style="color:var(--text-300);font-size:0.82rem">(Additional matches will proceed as new hosts register)</span>',
      sched_date3: '6/10',
      sched_item3: '<strong>June 10, 2026</strong><br>Host briefing session at Busan City Hall — Wehome attending; Welcome Home bags will be delivered to hosts',
      sched_date4: '6/12',
      sched_item4: '<strong>From June 12, 2026</strong><br>Guest check-in (some may check in from June 11 upon agreement).<br>Each guest receives a <strong>KRW 50,000 Busan Tourism Card</strong> and a Welcome Gift Bag at check-in.<br>Participate in the ARMY Challenge: SNS photo with host using hashtag <strong>#BorahaeHangeul</strong>.',
      sched_date5: '6/14',
      sched_item5: '<strong>June 14, 2026</strong><br>Global ARMY check-out / Final program evaluation',
      b1_label: 'Eligibility, Booking & Benefits',
      b1_title: 'Eligibility, Booking & Benefits',
      b1_cost: 'Guest Cost: KRW 0',
      b1_r1: 'Free stays are prioritized for global BTS ARMY. Booking may be canceled even after confirmation if ARMY status cannot be verified.',
      b1_r2: 'To accommodate as many fans as possible, living rooms might be offered as sleeping spaces. This will be specified in the listing details.',
      b1_r3: '<strong>Check-in & Check-out</strong> — Please respect the designated times. Host may offer flexibility if negotiated in advance.',
      b1_r4: '<strong>KRW 50,000 security deposit per person (via credit card)</strong> — Fully refunded as a pre-loaded Busan Tourism Card upon check-in. The card can be used like cash in Busan (excluding department stores/large malls). Non-refundable for no-shows.',
      b1_r5: '<strong>Welcome Home Wehome Gift Bag</strong> — Provided free of charge (first 100 guests). Sponsored by Busan City and Genabelle.',
      b1_r6: '<strong>Personal items & Transit</strong> — Please bring your own toiletries (toothbrush/toothpaste). You must arrange your own transport to the concert venue and stay.',
      b1_r7: '<strong>Access Restriction</strong> — Only matched guests are allowed entry. Sharing door codes or entry info with anyone else is strictly prohibited.',
      b1_r8: '<strong>Automatic Refund if Gift Card Unavailable</strong> — If we are unable to provide the Busan Tourism Gift Card, your deposit will be automatically refunded to your original payment method after your stay.',
      b2_label: 'House Rules',
      b2_title: 'House Rules & Etiquette',
      b2_r1: '<strong>Homestay Notice</strong> — These are private homes where Busan citizens reside. No flammable materials. Do not open private cabinets or use host\'s private items. Be considerate of roommates.',
      b2_r2: '<strong>Strictly No Smoking</strong> — Prohibited inside the home and anywhere on the premises.',
      b2_r3: '<strong>No Cooking</strong> — Kitchen use is not permitted. (Exceptions allowed only if explicitly approved by host via text)',
      b2_r4: '<strong>No Alcohol & Quiet Hours</strong> — Alcohol consumption is strictly prohibited in the home. Refrain from loud noise, singing, or dancing.',
      b2_r5: '<strong>Damage Liability</strong> — Guests are fully responsible and liable for any damage to bedding, furniture, or facilities.',
      b2_r6: '<strong>Privacy Protection</strong> — Do not post host\'s phone number, address, or detailed accommodation photos on SNS or public channels.',
      b2_r7: '<strong>Violation of rules may result in immediate eviction.</strong>',
      b3_label: 'Check-out',
      b3_title: 'Check-out & Recycling',
      b3_r1: 'Before checking out, return all used items to their places, clean and tidy up the space.',
      b3_r2: '<strong>Recycling is mandatory.</strong>',
      b3_dot3: 'Gen', b3_r3: '<strong>General Waste</strong> — Put non-recyclable items in the general trash bin.',
      b3_dot4: 'Rec', b3_r4: '<strong>Recyclables</strong> — Sort plastics, cans/metals, glass bottles, paper, and vinyl, and dispose of them in designated recycling areas.',
      b3_dot5: 'Food', b3_r5: '<strong>Food Waste</strong> — Drain moisture thoroughly and collect in the designated food waste bin or bag.',
      b3_r6: '※ Disposal methods may vary by home. Always follow specific instructions provided by your host.',
      b3_r7: '<strong>ARMY Challenge</strong> — Take a photo with your host and share it on SNS with the hashtag <strong>#BorahaeHangeul</strong>.',
      sup1: '<strong>Safety Support</strong>Liability insurance and event safety support system are in operation.',
      sup2: '<strong>Channel Talk (Fastest)</strong>Click the chat bubble icon on the bottom right of Wehome page.',
      sup3: '<strong>Email & Phone</strong>cs@wehome.me<br>1544-5665 (Weekdays 10:00–18:00 KST)<br><span style="font-size:0.8rem;color:var(--text-300)">Civic Council: 051-809-2629<br>Busan Econ Policy: 051-888-4751</span>',
      emerg_title: 'In Case of Emergency',
      emerg_desc: 'If you cannot reach the host or face an urgent safety issue,<br>click the button below to request immediate help from Wehome and Busan coordinators.',
      emerg_btn: '⚠ Request Emergency Support',
      back: '← Back',
      footer: 'Wehome Inc. | CEO: San-ku Cho | Privacy Manager: Suk-jin Kim | Biz Registration: 467-81-01292 / #507 SVCS, 136 Yanghwa-ro, Mapo-gu, Seoul | Customer Center: 1544-5665 | Weekdays 10:00–12:00, 13:00–18:00<br>© 2026 Wehome Inc. All rights reserved.'
    },
    ja: {
      title: 'ゲストガイドブック — K-POPSTAY BUSAN 2026',
      eyebrow: 'Guest Guidebook',
      page_title: '知っておくべきすべてのこと',
      page_sub: 'K-POPSTAY BUSAN 2026 · ゲスト利用規約 & ハウスルール',
      notice_title: '前提事項 / Notice',
      notice_body: '本ガイドは、Wehome의の共有宿泊利用規約に優先して適用されます。ここに記載のない事項については、Wehomeの一般利用規約に従います。',
      notice_body_en: 'This guide takes precedence over Wehome\'s general Terms of Service. Any matters not addressed here are governed by Wehome\'s standard Terms of Service.',
      intro_label: 'ご挨拶および紹介',
      intro_title: 'K-POPSTAY BUSAN 2026のご紹介',
      intro_p1: 'K-POPSTAY BUSAN 2026は、釜山のARMYと市民の自発的な参加のもと、釜山広域市とWehomeが共同で推進するプロジェクトです。グローバルARMYと釜山のARMYおよび市民をつなぐことで、宿泊問題を少しでも解消し、相互交流を深めることを目的としています。',
      intro_p2: '釜山市、Wehome、そして市民の皆様全員が自発的なボランティア精神で参加しています。特に今回のK-POPSTAY BUSAN 2026では、釜山のARMYや市民が自ら手を挙げ、グローバルARMYのために無償で自宅を開放しています。',
      intro_p3: '限られた時間の中で迅速に準備が進められたため、ARMYの皆様の主体的なご協力、ホストへの感謝と敬意の念が非常に重要です。不十分な点があるかもしれませんが、温かいご理解をお願いいたします。',
      intro_p4: 'Wehomeは今後もK-POPSTAYを改善し、世界のK-POPファンの宿泊問題の解決に向けてより一層努めてまいります。',
      sched_label: '主要日程',
      sched_title: 'Key Schedule',
      sched_date1: '6/7',
      sched_item1: '<strong>2026년 6월 7일까지</strong><br>グローバルARMYゲスト申請（深夜締め切り） / ゲストおよびホストのマッチング開始',
      sched_date2: '6/8',
      sched_item2: '<strong>2026년 6월 8일까지</strong><br>ゲスト・ホストのマッチング完了、予約手続き開始<br><span style="color:var(--text-300);font-size:0.82rem">（追加のホスト登録があり次第、随時マッチングおよび予約を進めます）</span>',
      sched_date3: '6/10',
      sched_item3: '<strong>2026년 6월 10일</strong><br>ホスト対象説明会（釜山市庁）の開催 — Wehome出席、ARMYに配布するウェルカムバッグを受け渡し予定',
      sched_date4: '6/12',
      sched_item4: '<strong>2026년 6월 12일부터</strong><br>ARMYチェックイン（一部ホストとの合意により6月11日からの入室も可能）。<br>チェックイン時にゲスト一人あたり<strong>5万ウォン分の釜山観光商品券</strong>とウェルカムギフトバッグを提供。<br>ARMYゲストチャレンジへの参加：ホストと写真を撮影し、ハッシュタグ <strong>#BorahaeHangeul</strong> でSNSに共有。',
      sched_date5: '6/14',
      sched_item5: '<strong>2026년 6월 14일</strong><br>グローバルARMYチェックアウト / 事業全体の評価',
      b1_label: '資格 · 宿泊形態 · 予約 · 特典',
      b1_title: 'Eligibility, Booking & Benefits',
      b1_cost: 'ゲスト費用：0ウォン',
      b1_r1: '無料宿泊はBTSグローバルARMYに優先提供されます。ARMYの確認が取れない場合、予約確定後でもキャンセルされることがあります。',
      b1_r2: 'より多くのARMYを歓迎するため、リビングルームも客室として区切って提供される場合があります。その場合はリスティングに明記されます。',
      b1_r3: '<strong>チェックイン・チェックアウト時間</strong> — 指定された時間を厳守してください。ホストと事前に合意がある場合は、柔軟に対応可能です。',
      b1_r4: '<strong>お一人様5万ウォンの保証金（クレジットカード決済）</strong> — チェックイン時に、同額がチャージされた釜山観光カードで全額返金されます。釜山市内の加盟店で現金同様に使用可能（デパートや大型モールを除く）。確定後のノーショー（無断キャンセル）は返金不可。',
      b1_r5: '<strong>Welcome Home Wehomeギフトバッグ</strong> — 先着100名のゲストに無料提供。釜山市およびジェナベル（Genabelle）後援。',
      b1_r6: '<strong>個人の持ち物・移動</strong> — アメニティ類（歯ブラシ等）は各自でご持参ください。コンサート会場や宿泊先までの移動はご自身で手配してください。',
      b1_r7: '<strong>立ち入り制限</strong> — 事前にマッチングされたゲストのみ入室可能です。玄関の暗証番号などの鍵情報は、他人に絶対に共有しないでください。',
      b1_r8: '<strong>ギフトカード提供不可時の自動返金</strong> — 釜山観光ギフトカードのお渡しができない場合は、ご宿泊後に保証金をお支払い元へ自動的に返金いたします。',
      b2_label: 'House Rules',
      b2_title: '宿泊ルールとエチケット',
      b2_r1: '<strong>ホームステイの注意点</strong> — 釜山市民が実際に生活しているプライベートな空間です。発火物の持ち込み禁止。ホストの私的なスペースや私物に勝手に触れたり使用したりしないでください。同居するARMY同士でお互い配慮しましょう。',
      b2_r2: '<strong>完全禁煙</strong> — 室内および建物内は終日禁煙です。',
      b2_r3: '<strong>調理禁止</strong> — キッチンおよび調理器具の使用はできません。（ホストのメッセージによる許可がある場合を除く）',
      b2_r4: '<strong>飲酒禁止・騒音注意</strong> — 自宅内での飲酒は厳禁です。近隣の迷惑となるような大声での会話や歌舞は絶対にお控えください。',
      b2_r5: '<strong>破損時の賠償責任</strong> — 寝具や設備などを破損した場合、修復・弁償の責任はゲストが負います。',
      b2_r6: '<strong>個人情報の保護</strong> — ホストの連絡先や詳細な住所情報は、SNSや外部に決して公開・流出させないでください。',
      b2_r7: '<strong>ルール違反が発覚した場合、直ちに退去を求める場合があります。</strong>',
      b3_label: 'チェックアウト',
      b3_title: 'チェックアウトおよびゴミの分別',
      b3_r1: 'チェックアウト前に、使用したすべての物を元の位置に戻し、きれいに掃除・整理整頓を行ってください。',
      b3_r2: '<strong>ゴミの分別回収は必須です。</strong>',
      b3_dot3: '一般', b3_r3: '<strong>一般ゴミ</strong> — リサイクルできないゴミは一般ゴミとして廃棄。',
      b3_dot4: '資源', b3_r4: '<strong>資源ゴミ</strong> — プラスチック、缶・金属、瓶、紙、ビニールに細かく分別し、指定の排出場所または回収ボックスへ。',
      b3_dot5: '生ゴミ', b3_r5: '<strong>生ゴミ</strong> — 水分をしっかりと切り、生ゴミ専用の容器または袋に分けてください。',
      b3_r6: '※ ゴミの排出方法は家庭ごとに異なる場合があります。ホストから別途案内があれば、それに従ってください。',
      b3_r7: '<strong>ARMYチャレンジ</strong> — ホストと一緒に写真を撮影し、ハッシュタグ <strong>#BorahaeHangeul</strong> でSNSに投稿してください。',
      sup1: '<strong>安全管理</strong>イベント賠償責任保険への加入および安全管理支援体制を構築・運営しています。',
      sup2: '<strong>チャネルトーク（最速）</strong>Wehomeサイトの右下にあるチャットアイコンから直接お問い合わせください。',
      sup3: '<strong>メール・電話</strong>cs@wehome.me<br>1544-5665（平日 10:00–18:00 KST）<br><span style="font-size:0.8rem;color:var(--text-300)">釜山市民団体協議会: 051-809-2629<br>釜山市庁 経済政策課: 051-888-4751</span>',
      emerg_title: '緊急事態が発生した場合',
      emerg_desc: 'ホストと連絡がつかない場合や現場で緊急の安全問題が発生した場合は、<br>以下のボタンをクリックして直ちにWehomeおよび釜山市の担当者へ支援を要請してください。',
      emerg_btn: '⚠ 緊急支援を要請する',
      back: '← 戻る',
      footer: 'Wehome Inc. | 代表取締役: 趙山九 | 個人情報保護責任者: 金碩珍 | 事業者登録番号: 467-81-01292 / ソウル特別市麻浦区楊花路136 SVCS 507 | カスタマーサポート: 1544-5665 | 平日 10:00–12:00, 13:00–18:00<br>© 2026 Wehome Inc. All rights reserved.'
    },
    zh_t: {
      title: '嘉賓指南 — K-POPSTAY BUSAN 2026',
      eyebrow: 'Guest Guidebook',
      page_title: '你需要知道的一切',
      page_sub: 'K-POPSTAY BUSAN 2026 · 嘉賓服務條款與住宿規則',
      notice_title: '前提條件 / Notice',
      notice_body: '本指南優先於Wehome共享住宿用戶服務條款。此處未提及的事項將遵循Wehome的一般服務條款。',
      notice_body_en: 'This guide takes precedence over Wehome\'s general Terms of Service. Any matters not addressed here are governed by Wehome\'s standard Terms of Service.',
      intro_label: '致詞與介紹',
      intro_title: 'K-POPSTAY BUSAN 2026 介紹',
      intro_p1: 'K-POPSTAY BUSAN 2026在釜山ARMY和市民的共同參與下，由釜山市與Wehome共享住宿平台共同推進。該項目旨在將全球ARMY與釜山當地的ARMY及市民連接起來，幫助緩解住宿短缺並促進相互的文化交流。',
      intro_p2: '釜山市、Wehome以及所有市民均本著志願服務的精神積極參與。特别是本次K-POPSTAY BUSAN 2026，釜山的ARMY和市民是完全自發無償為全球ARMY提供住宿的。',
      intro_p3: '由於是在緊張的準備時間內快速推進的，需要各位ARMY的積極配合，並對房東心懷感激與尊重。可能在細節上存在不夠完善的地方，敬請諒解。',
      intro_p4: 'Wehome今後將繼續完善K-POPSTAY，為解決全球K-POP歌迷的住宿問題而繼續努力。',
      sched_label: '主要日程',
      sched_title: 'Key Schedule',
      sched_date1: '6/7',
      sched_item1: '<strong>截至2026年6月7日</strong><br>全球ARMY嘉賓申請（午夜截止）/ 嘉賓與房東匹配開始',
      sched_date2: '6/8',
      sched_item2: '<strong>截至2026年6月8日</strong><br>嘉賓與房東匹配完成，開始預訂流程<br><span style="color:var(--text-300);font-size:0.82rem">（如有新房東註冊，將隨時進行追加匹配與預訂）</span>',
      sched_date3: '6/10',
      sched_item3: '<strong>2026年6月10日</strong><br>房東說明會（釜山市廳）召開 — Wehome出席，並計劃向房東交付ARMY迎賓禮包',
      sched_date4: '6/12',
      sched_item4: '<strong>自2026年6月12日起</strong><br>ARMY辦理入住（經部分房東同意後可自6月11日起提前入住）。<br>入住時，每位嘉賓將獲得一張面值<strong>5萬韓元的釜山觀光商品券</strong>以及迎賓禮包。<br>參與ARMY挑戰：與房東合影並帶上話題 <strong>#BorahaeHangeul</strong> 分享至社交平台。',
      sched_date5: '6/14',
      sched_item5: '<strong>2026年6月14日</strong><br>全球ARMY退房辦理 / 整個項目評估',
      b1_label: '資格 · 房源類型 · 預訂 · 福利',
      b1_title: 'Eligibility, Booking & Benefits',
      b1_cost: '嘉賓費用：0韓元',
      b1_r1: '免費住宿將優先提供給BTS全球ARMY。如果無法核實ARMY身份，即使確認後也可能被取消預訂。',
      b1_r2: '為了接待更多ARMY，客廳也可能被用作臥室提供。如有此情況，將在設施說明中註明。',
      b1_r3: '<strong>入住和退房時間</strong> — 請遵守約定時間。如果房東同意，可以靈活調整。',
      b1_r4: '<strong>每人5萬韓元保證金（信用卡支付）</strong> — 辦理入住時，保證金將全額退還為充值的釜山觀光卡。可在釜山市內的加盟店像現金一樣使用（百貨店、大型商場除外）。預訂確認後未入住（No-show）的保證金不予退還。',
      b1_r5: '<strong>Welcome Home Wehome 迎賓禮包</strong> — 免費提供給前100名嘉賓。由釜山市和Genabelle贊助。',
      b1_r6: '<strong>個人用品和交通</strong> — 個人洗漱用品（牙刷牙膏等）請自備。您必須自行安排前往演唱會場館和住宿的交通。',
      b1_r7: '<strong>出入限制和密碼禁傳</strong> — 僅限匹配成功的嘉賓入住。門鎖密碼等出入信息嚴禁洩露給他人。',
      b1_r8: '<strong>禮品卡無法提供時自動退款</strong> — 若無法提供釜山旅遊禮品卡，您的保證金將在退房後自動退還至原付款方式。',
      b2_label: 'House Rules',
      b2_title: '住宿規則與禮儀',
      b2_r1: '<strong>民宿注意事項</strong> — 這是釜山市民實際居住的私人空間。禁止攜帶易燃物品。請勿翻閱或使用房東的私人空間及物品。請與同住的ARMY互相關心和照顧。',
      b2_r2: '<strong>嚴禁吸煙</strong> — 室內以及樓宇內全天候禁止吸煙。',
      b2_r3: '<strong>禁止炊事</strong> — 原則上禁止使用廚房及烹飪工具。（房東以短信許可的情況除外）',
      b2_r4: '<strong>禁止飲酒並注意噪音</strong> — 嚴禁在民宿內飲酒。請勿大聲喧嘩、唱歌或跳舞，以免打擾鄰居。',
      b2_r5: '<strong>設施損壞及賠償責任</strong> — 損壞床上用品或設施時，嘉賓需承擔修復和賠償責任。',
      b2_r6: '<strong>隱私保護</strong> — 嚴禁將房東的聯絡方式及詳細的房源信息洩露給外部或分享到SNS等公開平台。',
      b2_r7: '<strong>違反規則時可能會被要求立即退房。</strong>',
      b3_label: '退房辦理',
      b3_title: '退房與垃圾分類',
      b3_r1: '退房前，請將所有使用過物品歸位，並清掃整理乾淨。',
      b3_r2: '<strong>垃圾分類是強制性的。</strong>',
      b3_dot3: '一般', b3_r3: '<strong>一般垃圾</strong> — 無法回收利用的垃圾分類為一般垃圾。',
      b3_dot4: '回收', b3_r4: '<strong>可回收物</strong> — 將塑料、金屬罐、玻璃瓶、紙張、塑料袋進行細緻分類，投放至指定區域或回收箱。',
      b3_dot5: '廚餘', b3_r5: '<strong>廚餘垃圾</strong> — 瀝乾水分後單獨收集到廚餘垃圾專用的容器或垃圾袋中。',
      b3_r6: '※ 垃圾投放方式因家庭而異。如果房東有單獨說明，請以房東的指導為準。',
      b3_r7: '<strong>ARMY挑戰</strong> — 與您的房東合影，並帶上 <strong>#BorahaeHangeul</strong> 話題分享到SNS社交平台上。',
      sup1: '<strong>安全管理</strong>已投保活動責任險，並建立和運行安全管理支持體系。',
      sup2: '<strong>Channel Talk (最快)</strong>請通過Wehome網頁右下角的線上客服圖示直接諮詢。',
      sup3: '<strong>電子郵件 · 電話</strong>cs@wehome.me<br>1544-5665 (工作日 10:00–18:00 KST)<br><span style="font-size:0.8rem;color:var(--text-300)">釜山市民團體協議會: 051-809-2629<br>釜山市廳 經濟政策科: 051-888-4751</span>',
      emerg_title: '發生緊急情況時',
      emerg_desc: '如果聯絡不到房東或現場發生緊急安全問題，<br>請點擊下方按鈕，立即向Wehome及釜山市相關負責人請求支持。',
      emerg_btn: '⚠ 請求緊急支援',
      back: '← 返回',
      footer: 'Wehome Inc. | 代表董事: 趙山九 | 個人資訊保護責任人: 金碩珍 | 商業註冊號: 467-81-01292 / 首爾特別市麻浦區楊話路136 SVCS 507 | 客戶服務: 1544-5665 | 工作日 10:00–12:00, 13:00–18:00<br>© 2026 Wehome Inc. All rights reserved.'
    },
    zh_s: {
      title: '嘉宾指南 — K-POPSTAY BUSAN 2026',
      eyebrow: 'Guest Guidebook',
      page_title: '你需要知道的一切',
      page_sub: 'K-POPSTAY BUSAN 2026 · 嘉宾服务条款与住宿规则',
      notice_title: '前提条件 / Notice',
      notice_body: '本指南优先于Wehome共享住宿用户服务条款。此处未提及的事项将遵循Wehome的一般服务条款。',
      notice_body_en: 'This guide takes precedence over Wehome\'s general Terms of Service. Any matters not addressed here are governed by Wehome\'s standard Terms of Service.',
      intro_label: '致辞与介绍',
      intro_title: 'K-POPSTAY BUSAN 2026 介绍',
      intro_p1: 'K-POPSTAY BUSAN 2026在釜山ARMY和市民的共同参与下，由釜山市与Wehome共享住宿平台共同推进。该项目旨在将全球ARMY与釜山当地的ARMY及市民连接起来，帮助缓解住宿短缺并促进相互的文化交流。',
      intro_p2: '釜山市、Wehome以及所有市民均本着志愿服务的精神积极参与。特别是本次K-POPSTAY BUSAN 2026，釜山的ARMY和市民是完全自发无偿为全球ARMY提供住宿的。',
      intro_p3: '由于是在紧张的准备时间内快速推进的，需要各位ARMY的积极配合，并对房东心怀感激与尊重。可能在细节上存在不够完善的地方，敬请谅解。',
      intro_p4: 'Wehome今后将继续完善K-POPSTAY，为解决全球K-POP歌迷的住宿问题而继续努力。',
      sched_label: '主要日程',
      sched_title: 'Key Schedule',
      sched_date1: '6/7',
      sched_item1: '<strong>截至2026年6月7日</strong><br>全球ARMY嘉宾申请（午夜截止）/ 嘉宾与房东匹配开始',
      sched_date2: '6/8',
      sched_item2: '<strong>截至2026年6月8日</strong><br>嘉宾与房东匹配完成，开始预订流程<br><span style="color:var(--text-300);font-size:0.82rem">(如有新房东注册，将随时进行追加匹配与预订)</span>',
      sched_date3: '6/10',
      sched_item3: '<strong>2026年6月10日</strong><br>房东说明会（釜山市厅）召开 — Wehome出席，并计划向房东交付ARMY迎宾礼包',
      sched_date4: '6/12',
      sched_item4: '<strong>自2026年6月12日起</strong><br>ARMY办理入住（经部分房东同意后可自6月11日起提前入住）。<br>入住时，每位嘉宾将获得一张面值<strong>5万韩元的釜山观光商品券</strong>以及迎宾礼包。<br>参与ARMY挑战：与房东合影并带上话题 <strong>#BorahaeHangeul</strong> 分享至社交平台。',
      sched_date5: '6/14',
      sched_item5: '<strong>2026年6月14日</strong><br>全球ARMY退房办理 / 整个项目评估',
      b1_label: '资格 · 房源类型 · 预订 · 福利',
      b1_title: 'Eligibility, Booking & Benefits',
      b1_cost: '嘉宾费用：0韩元',
      b1_r1: '免费住宿将优先提供给BTS全球ARMY。如果无法核实ARMY身份，即使确认后也可能被取消预订。',
      b1_r2: '为了接待更多ARMY，客厅也可能被用作卧室提供。如有此情况，将在设施说明中注明。',
      b1_r3: '<strong>入住和退房时间</strong> — 请遵守约定时间。如果房东同意，可以灵活调整。',
      b1_r4: '<strong>每人5万韩元保证金（信用卡支付）</strong> — 办理入住时，保证金将全额退还为充值的釜山观光卡。可在釜山市内的加盟店像现金一样使用（百货店、大型商场除外）。预订确认后未入住（No-show）的保证金不予退还。',
      b1_r5: '<strong>Welcome Home Wehome 迎宾礼包</strong> — 免费提供给前100名嘉宾。由釜山市和Genabelle赞助。',
      b1_r6: '<strong>个人用品和交通</strong> — 个人洗漱用品（牙刷牙膏等）请自备。您必须自行安排前往演唱会场馆和住宿的交通。',
      b1_r7: '<strong>出入限制和密码禁传</strong> — 仅限匹配成功的嘉宾入住。门锁密码等出入信息严禁泄露给他人。',
      b1_r8: '<strong>礼品卡无法提供时自动退款</strong> — 若无法提供釜山旅游礼品卡，您的保证金将在退房后自动退还至原付款方式。',
      b2_label: 'House Rules',
      b2_title: '住宿规则与礼仪',
      b2_r1: '<strong>民宿注意事项</strong> — 这是釜山市民实际居住的私人空间。禁止携带易燃物品。请勿翻阅或使用房东的私人空间及物品。请与同住的ARMY互相关心和照顾。',
      b2_r2: '<strong>严禁吸烟</strong> — 室内以及楼宇内全天候禁止吸烟。',
      b2_r3: '<strong>禁止炊事</strong> — 原则上禁止使用厨房及烹饪工具。（房东以短信许可的情况除外）',
      b2_r4: '<strong>禁止饮酒并注意噪音</strong> — 严禁在民宿内饮酒。请勿大声喧哗、唱歌或跳舞，以免打扰邻居。',
      b2_r5: '<strong>设施损坏及赔偿责任</strong> — 损坏床上用品或设施时，嘉宾需承担修复和赔偿责任。',
      b2_r6: '<strong>隐私保护</strong> — 严禁将房东的联系方式及详细的房源信息泄露给外部或分享到SNS等公开平台。',
      b2_r7: '<strong>违反规则时可能会被要求立即退房。</strong>',
      b3_label: '退房办理',
      b3_title: '退房与垃圾分类',
      b3_r1: '退房前，请将所有使用过的物品归位，并清扫整理干净。',
      b3_r2: '<strong>垃圾分类是强制性的。</strong>',
      b3_dot3: '一般', b3_r3: '<strong>一般垃圾</strong> — 无法回收利用的垃圾分类为一般垃圾。',
      b3_dot4: '回收', b3_r4: '<strong>可回收物</strong> — 将塑料、金属罐、玻璃瓶、纸张、塑料袋进行细致分类，投放至指定区域或回收箱。',
      b3_dot5: '厨余', b3_r5: '<strong>厨余垃圾</strong> — 沥干水分后单独收集到厨余垃圾专用的容器或垃圾袋中。',
      b3_r6: '※ 垃圾投放方式因家庭而异。如果房东有单独说明，请以房东的指导为准。',
      b3_r7: '<strong>ARMY挑战</strong> — 与您的房东合影，并带上 <strong>#BorahaeHangeul</strong> 话题分享到SNS社交平台上。',
      sup1: '<strong>安全管理</strong>已投保活动责任险，并建立和运行安全管理支持体系。',
      sup2: '<strong>Channel Talk (最快)</strong>请通过Wehome网页右下角的在线客服图标直接咨询。',
      sup3: '<strong>电子邮件 · 电话</strong>cs@wehome.me<br>1544-5665 (工作日 10:00–18:00 KST)<br><span style="font-size:0.8rem;color:var(--text-300)">釜山市民团体协议会: 051-809-2629<br>釜山市厅 经济政策科: 051-888-4751</span>',
      emerg_title: '发生紧急情况时',
      emerg_desc: '如果联系不到房东或现场发生紧急安全问题，<br>请点击下方按钮，立即向Wehome及釜山市相关负责人请求支持。',
      emerg_btn: '⚠ 请求紧急支援',
      back: '← 返回',
      footer: 'Wehome Inc. | 代表董事: 赵山九 | 个人信息保护责任人: 金硕珍 | 商业注册号: 467-81-01292 / 首尔特别市麻浦区杨花路136 SVCS 507 | 客户服务: 1544-5665 | 工作日 10:00–12:00, 13:00–18:00<br>© 2026 Wehome Inc. All rights reserved.'
    },
    id: {
      title: 'Buku Panduan Tamu — K-POPSTAY BUSAN 2026',
      eyebrow: 'Guest Guidebook',
      page_title: 'Semua yang Perlu Anda Ketahui',
      page_sub: 'K-POPSTAY BUSAN 2026 · Ketentuan Tamu & Peraturan Rumah',
      notice_title: 'Notice',
      notice_body: 'Panduan ini diutamakan di atas Ketentuan Layanan umum Wehome. Hal-hal yang tidak diatur di sini tunduk pada Ketentuan Layanan standar Wehome.',
      notice_body_en: 'This guide takes precedence over Wehome\'s general Terms of Service. Any matters not addressed here are governed by Wehome\'s standard Terms of Service.',
      intro_label: 'Salam & Pengantar',
      intro_title: 'Tentang K-POPSTAY BUSAN 2026',
      intro_p1: 'K-POPSTAY BUSAN 2026 diselenggarakan bersama oleh Kota Busan dan Wehome, didukung oleh partisipasi sukarela warga Busan dan penggemar K-POP lokal. Program komunitas ini menghubungkan penggemar global dengan warga lokal untuk membantu mengatasi masalah akomodasi dan mendorong pertukaran budaya timbal balik.',
      intro_p2: 'Program ini berjalan sepenuhnya berkat upaya sukarela Kota Busan, Wehome, dan para host kami. Secara khusus, host membuka rumah mereka secara gratis murni karena keramahtamahan bagi para penggemar ARMY global.',
      intro_p3: 'Karena program ini sangat bergantung pada itikad baik dan diatur dalam jangka waktu yang ketat, kami meminta rasa hormat, rasa terima kasih, dan kerja sama aktif Anda. Harap maklum jika beberapa aspek tidak sehalus hotel komersial.',
      intro_p4: 'Wehome akan terus meningkatkan K-POPSTAY untuk membantu mengatasi masalah akomodasi bagi penggemar K-POP global di masa depan.',
      sched_label: 'Jadwal Utama',
      sched_title: 'Key Schedule',
      sched_date1: '6/7',
      sched_item1: '<strong>Hingga 7 Juni 2026</strong><br>Pendaftaran Tamu ARMY Global (Tutup tengah malam) / Pencocokan dimulai',
      sched_date2: '6/8',
      sched_item2: '<strong>Hingga 8 Juni 2026</strong><br>Pencocokan tamu-host selesai & pemesanan dimulai<br><span style="color:var(--text-300);font-size:0.82rem">(Pencocokan tambahan akan berlanjut saat host baru mendaftar)</span>',
      sched_date3: '6/10',
      sched_item3: '<strong>10 Juni 2026</strong><br>Sesi pengarahan host di Balai Kota Busan — Wehome hadir; tas Welcome Home akan dikirimkan ke host',
      sched_date4: '6/12',
      sched_item4: '<strong>Mulai 12 Juni 2026</strong><br>Check-in tamu (beberapa dapat check-in dari 11 Juni atas kesepakatan).<br>Setiap tamu menerima <strong>Kartu Wisata Busan senilai KRW 50.000</strong> dan Tas Hadiah Selamat Datang saat check-in.<br>Ikut serta dalam ARMY Challenge: foto bersama host di media sosial menggunakan tagar <strong>#BorahaeHangeul</strong>.',
      sched_date5: '6/14',
      sched_item5: '<strong>14 Juni 2026</strong><br>Check-out ARMY global / Evaluasi program akhir',
      b1_label: 'Kelayakan, Pemesanan & Manfaat',
      b1_title: 'Eligibility, Booking & Benefits',
      b1_cost: 'Biaya Tamu: KRW 0',
      b1_r1: 'Menginap gratis diprioritaskan untuk ARMY BTS global. Pemesanan dapat dibatalkan bahkan setelah konfirmasi jika status ARMY tidak dapat diverifikasi.',
      b1_r2: 'Untuk menampung sebanyak mungkin penggemar, ruang tamu mungkin ditawarkan sebagai ruang tidur. Hal ini akan ditentukan dalam detail listing.',
      b1_r3: '<strong>Check-in & Check-out</strong> — Harap hormati waktu yang ditentukan. Host dapat menawarkan fleksibilitas jika dinegosiasikan sebelumnya.',
      b1_r4: '<strong>Deposit keamanan KRW 50.000 per orang (via kartu kredit)</strong> — Dikembalikan sepenuhnya sebagai Kartu Wisata Busan yang telah diisi saat check-in. Kartu ini dapat digunakan seperti uang tunai di Busan (tidak termasuk toserba/mall besar). Tidak dapat dikembalikan untuk ketidakhadiran (no-show).',
      b1_r5: '<strong>Tas Hadiah Welcome Home Wehome</strong> — Disediakan gratis (100 tamu pertama). Disponsori oleh Kota Busan dan Genabelle.',
      b1_r6: '<strong>Barang pribadi & Transit</strong> — Harap bawa perlengkapan mandi Anda sendiri (sikat gigi/pasta gigi). Anda harus mengatur transportasi Anda sendiri ke lokasi konser dan tempat menginap.',
      b1_r7: '<strong>Batasan Akses</strong> — Hanya tamu yang cocok yang diizinkan masuk. Membagikan kode pintu atau info masuk dengan orang lain sangat dilarang.',
      b1_r8: '<strong>Pengembalian Otomatis jika Kartu Hadiah Tidak Tersedia</strong> — Jika kami tidak dapat menyediakan Kartu Hadiah Wisata Busan, deposit Anda akan dikembalikan secara otomatis ke metode pembayaran asal setelah menginap.',
      b2_label: 'Peraturan Rumah',
      b2_title: 'Peraturan Rumah & Etika',
      b2_r1: '<strong>Pemberitahuan Homestay</strong> — Ini adalah rumah pribadi tempat warga Busan tinggal. Tidak ada bahan yang mudah terbakar. Jangan membuka lemari pribadi atau menggunakan barang pribadi host. Bersikaplah tenggang rasa dengan teman sekamar.',
      b2_r2: '<strong>Dilarang Merokok</strong> — Dilarang keras merokok di dalam rumah dan di mana saja di area sekitar rumah.',
      b2_r3: '<strong>Dilarang Memasak</strong> — Penggunaan dapur tidak diizinkan. (Pengecualian diizinkan hanya jika disetujui secara eksplisit oleh host via SMS)',
      b2_r4: '<strong>Dilarang Minum Alkohol & Jam Tenang</strong> — Konsumsi alkohol sangat dilarang di rumah. Hindari kebisingan, bernyanyi, atau menari.',
      b2_r5: '<strong>Tanggung Jawab Kerusakan</strong> — Tamu bertanggung jawab penuh atas segala kerusakan pada tempat tidur, perabotan, atau fasilitas.',
      b2_r6: '<strong>Perlindungan Privasi</strong> — Jangan memposting nomor telepon host, alamat, atau foto akomodasi terperinci di media sosial atau saluran publik.',
      b2_r7: '<strong>Pelanggaran aturan dapat mengakibatkan pengusiran segera.</strong>',
      b3_label: 'Check-out',
      b3_title: 'Check-out & Daur Ulang',
      b3_r1: 'Sebelum check-out, kembalikan semua barang yang digunakan ke tempatnya, bersihkan dan rapikan ruangan.',
      b3_r2: '<strong>Daur ulang adalah wajib.</strong>',
      b3_dot3: 'Umum', b3_r3: '<strong>Sampah Umum</strong> — Buang barang yang tidak dapat didaur ulang di tempat sampah umum.',
      b3_dot4: 'Daur', b3_r4: '<strong>Barang Daur Ulang</strong> — Sortir plastik, kaleng/logam, botol kaca, kertas, dan plastik kresek, lalu buang di area daur ulang yang ditentukan.',
      b3_dot5: 'Makan', b3_r5: '<strong>Sampah Makanan</strong> — Tiriskan air secara menyeluruh dan kumpulkan di tempat sampah atau kantong sampah makanan yang ditentukan.',
      b3_r6: '※ Metode pembuangan dapat bervariasi tergantung rumah. Selalu ikuti petunjuk spesifik yang diberikan oleh host Anda.',
      b3_r7: '<strong>ARMY Challenge</strong> — Ambil foto bersama host Anda dan bagikan di media sosial dengan tagar <strong>#BorahaeHangeul</strong>.',
      sup1: '<strong>Dukungan Keselamatan</strong>Asuransi tanggung jawab hukum dan sistem dukungan keselamatan acara beroperasi.',
      sup2: '<strong>Channel Talk (Tercepat)</strong>Klik ikon gelembung obrolan di kanan bawah halaman Wehome.',
      sup3: '<strong>Email & Telepon</strong>cs@wehome.me<br>1544-5665 (Hari kerja 10:00–18:00 KST)<br><span style="font-size:0.8rem;color:var(--text-300)">Dewan Warga: 051-809-2629<br>Kebijakan Ekon Busan: 051-888-4751</span>',
      emerg_title: 'Jika Terjadi Darurat',
      emerg_desc: 'Jika Anda tidak dapat menghubungi host atau menghadapi masalah keselamatan yang mendesak,<br>klik tombol di bawah untuk meminta bantuan segera dari Wehome dan koordinator Busan.',
      emerg_btn: '⚠ Minta Dukungan Darurat',
      back: '← Kembali',
      footer: 'Wehome Inc. | CEO: San-ku Cho | Manajer Privasi: Suk-jin Kim | Registrasi Bisnis: 467-81-01292 / #507 SVCS, 136 Yanghwa-ro, Mapo-gu, Seoul | Layanan Pelanggan: 1544-5665 | Hari kerja 10:00–12:00, 13:00–18:00<br>© 2026 Wehome Inc. All rights reserved.'
    }
  };

  // guest-guidebook.html 전용 번역 함수
  function applyTranslationsGuestGuidebook(){
    var lg = lang;
    var d = GGB[lg] || GGB['en'];
    function q(sel,v){ var el=document.querySelector(sel); if(el) el.innerHTML=v; }
    function qa(sel,v){ document.querySelectorAll(sel).forEach(function(el){el.textContent=v;}); }

    document.documentElement.lang = lg==='zh_t'?'zh-TW':lg==='zh_s'?'zh-CN':lg==='ja'?'ja':lg==='id'?'id':lg==='ko'?'ko':'en';

    // NAV
    var lbl=document.getElementById('kpopLangCurLabel'); if(lbl) lbl.textContent=window.KPOP_LANG_LABEL||'EN';
    q('#ggb-btn-back', d.back);

    // HEADER
    document.title = d.title;
    var ogTitle = document.querySelector('meta[property="og:title"]'); if(ogTitle) ogTitle.setAttribute('content', d.title);
    q('#ggb-eyebrow', d.eyebrow);
    q('#ggb-page-title', d.page_title);
    q('#ggb-page-sub', d.page_sub);

    // NOTICE
    q('#ggb-notice-title', d.notice_title);
    q('#ggb-notice-body', d.notice_body);
    q('#ggb-notice-body-en', d.notice_body_en);
    var bodyEn = document.getElementById('ggb-notice-body-en');
    if(bodyEn) {
      if(lg === 'en') {
        bodyEn.style.display = 'none';
      } else {
        bodyEn.style.display = 'inline';
      }
    }

    // INTRO
    q('#ggb-intro-label', d.intro_label);
    q('#ggb-intro-title', d.intro_title);
    q('#ggb-intro-p1', d.intro_p1);
    q('#ggb-intro-p2', d.intro_p2);
    q('#ggb-intro-p3', d.intro_p3);
    q('#ggb-intro-p4', d.intro_p4);

    // SCHEDULE
    q('#ggb-sched-label', d.sched_label);
    q('#ggb-sched-title', d.sched_title);
    q('#ggb-sched-date1', d.sched_date1);
    q('#ggb-sched-item1', d.sched_item1);
    q('#ggb-sched-date2', d.sched_date2);
    q('#ggb-sched-item2', d.sched_item2);
    q('#ggb-sched-date3', d.sched_date3);
    q('#ggb-sched-item3', d.sched_item3);
    q('#ggb-sched-date4', d.sched_date4);
    q('#ggb-sched-item4', d.sched_item4);
    q('#ggb-sched-date5', d.sched_date5);
    q('#ggb-sched-item5', d.sched_item5);

    // BLOCK 1 (Eligibility, Booking & Benefits)
    q('#ggb-b1-label', d.b1_label);
    q('#ggb-b1-title', d.b1_title);
    q('#ggb-b1-cost', d.b1_cost);
    q('#ggb-b1-r1', d.b1_r1);
    q('#ggb-b1-r2', d.b1_r2);
    q('#ggb-b1-r3', d.b1_r3);
    q('#ggb-b1-r4', d.b1_r4);
    q('#ggb-b1-r5', d.b1_r5);
    q('#ggb-b1-r6', d.b1_r6);
    q('#ggb-b1-r7', d.b1_r7);
    q('#ggb-b1-r8', d.b1_r8);

    // BLOCK 2 (House Rules)
    q('#ggb-b2-label', d.b2_label);
    q('#ggb-b2-title', d.b2_title);
    q('#ggb-b2-r1', d.b2_r1);
    q('#ggb-b2-r2', d.b2_r2);
    q('#ggb-b2-r3', d.b2_r3);
    q('#ggb-b2-r4', d.b2_r4);
    q('#ggb-b2-r5', d.b2_r5);
    q('#ggb-b2-r6', d.b2_r6);
    q('#ggb-b2-r7', d.b2_r7);

    // BLOCK 3 (Check-out)
    q('#ggb-b3-label', d.b3_label);
    q('#ggb-b3-title', d.b3_title);
    q('#ggb-b3-r1', d.b3_r1);
    q('#ggb-b3-r2', d.b3_r2);
    q('#ggb-b3-dot3', d.b3_dot3); q('#ggb-b3-r3', d.b3_r3);
    q('#ggb-b3-dot4', d.b3_dot4); q('#ggb-b3-r4', d.b3_r4);
    q('#ggb-b3-dot5', d.b3_dot5); q('#ggb-b3-r5', d.b3_r5);
    q('#ggb-b3-r6', d.b3_r6);
    q('#ggb-b3-r7', d.b3_r7);

    // SUPPORT
    q('#ggb-sup1', d.sup1);
    q('#ggb-sup2', d.sup2);
    q('#ggb-sup3', d.sup3);
    q('#ggb-sup-emerg-title', d.emerg_title);
    q('#ggb-sup-emerg-desc', d.emerg_desc);
    q('#ggb-sup-emerg-btn', d.emerg_btn);

    // FOOTER
    q('#ggb-footer-text', d.footer);
  }

  // travel-guide.html 전용 번역 딕셔너리
  var TG = {
    ko:{
      back:'← 홈으로', apply:'신청하기 ›',
      hero_eyebrow:'부산 여행 가이드 2026',
      hero_title:'BTS 부산 콘서트<br><span>여행 가이드</span>',
      hero_sub:'숙소, 교통, 즐길 거리 — 2026년 6월 부산 방문 아미를 위한 모든 정보.',
      concert_h:'BTS 월드투어 \'ARIRANG\' IN BUSAN — 핵심 정보',
      cb_dates:'날짜', cb_dates_v:'2026년 6월 12–13일',
      cb_time:'시간', cb_time_v:'오후 7:00 KST',
      cb_venue:'장소', cb_venue_v:'부산 아시아드 주경기장',
      cb_ticket:'티켓 판매', cb_ticket_v:'NOL Ticket (공식)',
      cb_stream:'스트리밍', cb_stream_v:'Weverse Concerts',
      cb_age:'관람 연령', cb_age_v:'만 9세 이상',
      warn:'<strong>티켓 사기 주의:</strong> 반드시 <strong>NOL Ticket</strong>(공식 판매처)에서만 구매하세요. 해외 팬을 대상으로 한 사기가 많습니다. BTS/Weverse 공식 채널을 통해 구매 여부를 반드시 확인하세요.',
      why_eyebrow:'왜 부산인가', why_title:'콘서트 그 이상의 도시',
      why_desc:'부산은 지민과 정국의 고향입니다. 도시 전체가 투어에 맞춰 대규모 공연·행사를 준비 중으로, 경기장을 넘어 축제 같은 여행지가 됩니다.',
      drone_h:'BTS THE CITY ARIRANG 부산',
      drone_p:'웰컴 센터, 스탬프 랠리, 랜드마크 조명, 호텔 패키지 등 도시 전역 행사와 함께 <strong>광안대교 드론 라이트쇼</strong> — 6월 12·13일 오후 10:00 KST.',
      stay_eyebrow:'숙박', stay_title:'추천 숙소 지역',
      stay_desc:'여행 스타일에 따라 베이스캠프를 선택하세요. 아래 지역 모두 경기장으로의 교통이 편리합니다.',
      area1_label:'처음 방문자', area1_title:'서면', area1_desc:'중심가, 편리한 교통. 처음 부산을 방문하는 분께 가장 추천하는 지역.',
      area2_label:'KTX 이용자', area2_title:'부산역', area2_desc:'KTX에서 내리면 바로. 서울에서 기차로 오는 분께 최적.',
      area3_label:'해변·휴양', area3_title:'해운대', area3_desc:'한국 최고의 해수욕장. 오션뷰, 고급 호텔, 카페. 휴가 느낌을 원한다면 해운대.',
      area4_label:'야경·사진', area4_title:'광안리', area4_desc:'광안대교 야경이 압도적. 트렌디한 카페·맛집. 드론쇼를 해변에서 관람 가능.',
      area5_label:'경기장 인근', area5_title:'사직·스포츠복합', area5_desc:'경기장과 가장 가까운 지역. 콘서트 당일 이동 시간을 최소화하고 싶다면.',
      area6_label:'K-POPSTAY', area6_title:'부산 시민 호스트와 함께', area6_desc:'K-POPSTAY BUSAN을 통해 검증된 부산 시민 호스트와 <strong>무료 2박</strong> 신청하기. <a href="/apply" style="color:var(--purple);font-weight:700">신청하기 ›</a>',
      transport_eyebrow:'교통', transport_title:'부산 가는 방법',
      transport_desc:'출발지에 따라 세 가지 방법 중 선택하세요.',
      th_option:'방법', th_from:'출발지', th_dur:'소요시간', th_notes:'참고',
      tr1_opt:'🚄 KTX', tr1_from:'서울역', tr1_dur:'약 2.5–3시간', tr1_note:'가장 인기 있는 방법. 콘서트 주말에는 좌석이 빨리 매진되니 미리 예매하세요.',
      tr2_opt:'✈️ 비행기', tr2_from:'아시아 주요 도시', tr2_dur:'다양', tr2_note:'김해국제공항 도착. 해외에서 부산으로 바로 오는 분께 적합.',
      tr3_opt:'🚌 고속버스', tr3_from:'서울 등', tr3_dur:'4–5시간+', tr3_note:'가장 저렴하지만 시간이 오래 걸림. 콘서트 주말에는 추천하지 않음.',
      highlight:'<strong>추천 일정:</strong> 서울 도착 → 1–3일 관광 → KTX로 부산 이동 → 콘서트 주말 부산 체류 → 이후 서울 복귀. 공연 직후 서울로 돌아가는 것은 인파와 늦은 종료 시간으로 비현실적.',
      stadium_eyebrow:'콘서트 당일 교통', stadium_title:'경기장 가는 방법',
      stadium_desc:'부산 아시아드 주경기장은 연제구에 위치. 가까운 지하철역: <strong>종합운동장역</strong>, <strong>사직역</strong>.',
      s1_title:'지하철 이용', s1_desc:'콘서트 당일에는 택시보다 지하철을 강력히 추천합니다. 경기장 인근 교통이 통제될 수 있어 평소보다 이동 시간이 더 걸릴 수 있습니다.',
      s2_title:'셔틀버스', s2_desc:'Klook 등 플랫폼에서 왕복 셔틀버스 예약 가능. 부산역·서면·해운대 출발. 사전 예약 필수.',
      tips_eyebrow:'준비', tips_title:'콘서트 당일 팁',
      tips_desc:'오후 7시 공연 기준, 오후 이른 시간부터 인파가 몰립니다. 미리 준비하세요.',
      cl_1:'오후 7시 공연 기준 몇 시간 전 일찍 출발', cl_2:'보조배터리 필수 지참',
      cl_3:'모바일 데이터 준비 (eSIM 권장)', cl_4:'편한 신발 착용',
      cl_5:'Weverse, NOL Ticket, BTS 투어 페이지 모니터링', cl_6:'당일 가방/입장 규정 확인',
      cl_7:'마지막 지하철 시간 확인', cl_8:'호텔 주소 한국어로 저장',
      attract_eyebrow:'부산 관광', attract_title:'주요 명소',
      attract_desc:'콘서트 외에도 부산에서 즐길 것들.',
      th_place:'장소', th_highlights:'특징',
      at1_p:'🏖️ 해운대해수욕장', at1_h:'산책로, 고급 호텔, 카페·레스토랑. 한국 최고의 해수욕장.',
      at2_p:'🌉 광안리해수욕장', at2_h:'광안대교 야경, 트렌디한 스팟, 드론쇼 관람 명소.',
      at3_p:'🎨 감천문화마을', at3_h:'알록달록한 벽화와 골목. 포토스팟으로 유명.',
      at4_p:'🐟 자갈치시장', at4_h:'한국 최대 해산물 시장. 아침 갓 잡은 해산물 맛보기.',
      at5_p:'🍢 남포동 / BIFF광장', at5_h:'길거리 음식, 현지 분위기, 구 부산의 중심.',
      at6_p:'🏯 부산타워 / 용두산공원', at6_h:'도심 파노라마 전망. 공연 전 여유로운 아침 코스.',
      itin_eyebrow:'추천 일정', itin_title:'3일 샘플 일정',
      itin_desc:'콘서트 주말을 위한 현실적인 일정.',
      day1_label:'1일차', day1_title:'도착 &amp; 체크인',
      day1_li1:'숙소 체크인', day1_li2:'저녁 숙소 주변 가볍게 산책',
      day1_li3:'서면·해운대·광안리·남포동 중 한 곳 탐방', day1_li4:'다음 날을 위해 일찍 취침',
      day2_label:'2일차', day2_title:'콘서트 데이 🎵',
      day2_li1:'오전 휴식', day2_li2:'오후 일찍 출발 (오후 7시 공연)',
      day2_li3:'지하철 이용 — 택시 지양', day2_li4:'BTS 월드투어 \'ARIRANG\' 관람',
      day2_li5:'선택: 오후 10시 광안리 드론쇼',
      day3_label:'3일차', day3_title:'부산 탐방',
      day3_li1:'여유로운 오전 관광', day3_li2:'코스 A: 해운대 + 광안리',
      day3_li3:'코스 B: 감천 + 남포동 + 자갈치', day3_li4:'KTX로 서울 복귀',
      pack_eyebrow:'짐 챙기기', pack_title:'준비물 체크리스트',
      pack_desc:'6월 한국은 따뜻하고 습하며 비가 자주 옵니다. 매일 날씨를 확인하고 가볍게 짐을 꾸리세요.',
      pk1:'여권 &amp; 콘서트 티켓', pk2:'숙소 예약 확인서',
      pk3:'eSIM 또는 현지 유심', pk4:'보조배터리 (필수)',
      pk5:'편한 신발', pk6:'가벼운 재킷 / 우비',
      pk7:'작은 가방 (경기장 규정 사이즈)', pk8:'현금 + 카드',
      pk9:'T-money 교통카드', pk10:'번역 앱',
      pk11:'개인 상비약', pk12:'선택: 귀마개',
      safety_eyebrow:'안전', safety_title:'솔로 여행자 팁',
      safety_desc:'부산은 안전한 도시지만, 작은 준비가 큰 도움이 됩니다.',
      sf1_title:'연락 유지', sf1_desc:'신뢰할 수 있는 지인에게 숙소 위치를 공유하세요. 폰에 숙소 주소를 한국어로 저장해두면 택시 이용과 길찾기에 매우 유용합니다.',
      sf2_title:'안전하게 이동하기', sf2_desc:'공식 택시 또는 신뢰할 수 있는 앱을 이용하세요. 비공식 티켓·굿즈 거래는 피하세요. 마지막 지하철 시간을 미리 확인해두세요.',
      sf3_title:'여행자 보험', sf3_desc:'항공·호텔·의료를 커버하는 여행자 보험 가입을 권장합니다. 콘서트 주말은 예상치 못한 변수가 생길 수 있습니다.',
      sf4_title:'티켓 사기 주의', sf4_desc:'NOL Ticket(공식 판매처)에서만 구매하세요. 해외 팬을 노린 사기가 많습니다. 모든 구매는 BTS/Weverse 공식 채널로 확인하세요.',
      cta_eyebrow:'K-POPSTAY BUSAN 2026',
      cta_title:'부산 숙소가 필요하신가요?',
      cta_desc:'K-POPSTAY BUSAN을 통해 검증된 부산 시민 호스트와 <strong>무료 2박 숙박</strong>을 신청하세요. 외국인 아미 팬 우선 선발.',
      cta_apply:'무료 숙박 신청하기 ›', cta_more:'더 알아보기',
      footer_ref:'참고 자료: koreareadyguide.com'
    },
    en:{
      back:'← Home', apply:'Apply Now ›',
      hero_eyebrow:'Busan Travel Guide 2026',
      hero_title:'BTS Busan Concert<br><span>Travel Guide</span>',
      hero_sub:"Where to stay, how to get there, what to do — everything ARMY needs to know for Busan, June 2026.",
      concert_h:"BTS WORLD TOUR 'ARIRANG' IN BUSAN — Key Details",
      cb_dates:'Dates',cb_dates_v:'June 12–13, 2026',
      cb_time:'Time',cb_time_v:'7:00 PM KST',
      cb_venue:'Venue',cb_venue_v:'Busan Asiad Main Stadium',
      cb_ticket:'Ticket Seller',cb_ticket_v:'NOL Ticket (Official)',
      cb_stream:'Streaming',cb_stream_v:'Weverse Concerts',
      cb_age:'Age Limit',cb_age_v:'9 years and older',
      warn:'<strong>Ticketing Warning:</strong> Only purchase through <strong>NOL Ticket</strong> (official seller). Scams targeting international fans are common. Verify all purchases via official BTS/Weverse channels.',
      why_eyebrow:'Why Busan',why_title:'More Than a Concert',
      why_desc:'Busan is the hometown of Jimin and Jungkook. The city is planning large-scale entertainment tied to the tour, making it a festival-style destination beyond just the stadium.',
      drone_h:'BTS THE CITY ARIRANG Busan',
      drone_p:'Citywide programming including a welcome center, stamp rally, landmark lighting, hotel packages, and a <strong>drone light show at Gwangandaegyo Bridge</strong> — June 12 &amp; 13 at 10:00 PM KST.',
      stay_eyebrow:'Accommodation',stay_title:'Best Areas to Stay',
      stay_desc:'Choose your base depending on your travel style. All areas below have good transport links to the stadium.',
      area1_label:'First-timers',area1_title:'Seomyeon',area1_desc:"Central, convenient, great transport connections. Best for first-time visitors who want easy access to everything.",
      area2_label:'KTX Travelers',area2_title:'Busan Station',area2_desc:"Step off the KTX and you're already there. Ideal for those arriving from Seoul by train.",
      area3_label:'Beach & Vacation',area3_title:'Haeundae',area3_desc:"Korea's most famous beach. Great ocean views, upscale hotels, and a lively café scene.",
      area4_label:'Night Views & Photos',area4_title:'Gwangalli',area4_desc:'Stunning night views of Gwangan Bridge. Trendy cafés and great photo spots. Watch the drone show from the beach.',
      area5_label:'Stadium Proximity',area5_title:'Sajik / Sports Complex',area5_desc:'Closest to the venue. Practical if minimising transit time on concert day is your top priority.',
      area6_label:'K-POPSTAY',area6_title:'Stay with a Busan Citizen',area6_desc:'Apply for a <strong>free 2-night stay</strong> with a verified Busan citizen host through K-POPSTAY BUSAN. <a href="/apply" style="color:var(--purple);font-weight:700">Apply now ›</a>',
      transport_eyebrow:'Getting There',transport_title:'How to Get to Busan',
      transport_desc:'Three main options depending on where you\'re coming from.',
      th_option:'Option',th_from:'From',th_dur:'Duration',th_notes:'Notes',
      tr1_opt:'🚄 KTX',tr1_from:'Seoul Station',tr1_dur:'~2.5–3 hrs',tr1_note:'Most popular option. Book in advance — seats sell out fast during concert weekend.',
      tr2_opt:'✈️ Fly',tr2_from:'Other Asian cities',tr2_dur:'Varies',tr2_note:'Arrive at Gimhae International Airport. Good for international travelers coming directly to Busan.',
      tr3_opt:'🚌 Express Bus',tr3_from:'Seoul & other cities',tr3_dur:'4–5+ hrs',tr3_note:'Cheapest but significantly longer. Not recommended for concert weekend.',
      highlight:'<strong>Recommended plan:</strong> Arrive via Seoul → 1–3 days sightseeing → take KTX to Busan → stay for concert weekend → return to Seoul after. Avoid trying to return to Seoul immediately after the show.',
      stadium_eyebrow:'Concert Day Transport',stadium_title:'Getting to the Stadium',
      stadium_desc:'Busan Asiad Main Stadium is in Yeonje-gu. Nearest subway stations: <strong>Sports Complex Station</strong> and <strong>Sajik Station</strong>.',
      s1_title:'Take the Subway',s1_desc:'Subway is strongly recommended over taxis on concert day. Traffic near the venue may be restricted. Plan for longer travel time.',
      s2_title:'Shuttle Buses',s2_desc:'Round-trip shuttle buses available via platforms like Klook. Pickup from Busan Station, Seomyeon, and Haeundae. Book in advance.',
      tips_eyebrow:'Preparation',tips_title:'Concert Day Tips',
      tips_desc:"A 7:00 PM show means crowds build from early afternoon. Be prepared.",
      cl_1:'Arrive several hours before 7:00 PM',cl_2:'Bring a portable charger — essential',
      cl_3:'Prepare mobile data (eSIM recommended)',cl_4:'Wear comfortable shoes',
      cl_5:'Monitor Weverse, NOL Ticket, and BTS tour page',cl_6:'Check bag/entry rules before the day',
      cl_7:'Know the last subway departure time',cl_8:'Save your hotel address in Korean',
      attract_eyebrow:'Explore Busan',attract_title:'Top Attractions',
      attract_desc:'Make the most of your time in Busan beyond the concert.',
      th_place:'Place',th_highlights:'Highlights',
      at1_p:'🏖️ Haeundae Beach',at1_h:'Ocean walks, upscale hotels, cafés. Korea\'s most famous beach.',
      at2_p:'🌉 Gwangalli Beach',at2_h:'Night views of Gwangan Bridge, trendy spots, great for the drone show.',
      at3_p:'🎨 Gamcheon Culture Village',at3_h:'Colourful murals and alleys climbing up a hillside. Great photo spots.',
      at4_p:'🐟 Jagalchi Market',at4_h:"Korea's famous seafood market. Try live seafood fresh from the morning catch.",
      at5_p:'🍢 Nampo-dong / BIFF Square',at5_h:'Street food, local atmosphere, and the heart of old Busan.',
      at6_p:'🏯 Busan Tower / Yongdusan Park',at6_h:'Panoramic city views. Great for a relaxed morning before the show.',
      itin_eyebrow:'Suggested Plan',itin_title:'Sample 3-Day Itinerary',
      itin_desc:'A practical structure for the concert weekend.',
      day1_label:'Day 1',day1_title:'Arrive & Settle In',
      day1_li1:'Check in to your accommodation',day1_li2:'Light evening walk near your area',
      day1_li3:'Explore: Seomyeon, Haeundae, Gwangalli, or Nampo-dong',day1_li4:'Rest early — big day tomorrow',
      day2_label:'Day 2',day2_title:'Concert Day 🎵',
      day2_li1:'Rest in the morning',day2_li2:'Depart for stadium early (7:00 PM show)',
      day2_li3:'Take the subway — avoid taxis',day2_li4:"Attend BTS WORLD TOUR 'ARIRANG'",
      day2_li5:'Optional: Gwangalli drone show at 10:00 PM',
      day3_label:'Day 3',day3_title:'Explore Busan',
      day3_li1:'Relaxed morning sightseeing',day3_li2:'Option A: Haeundae + Gwangalli',
      day3_li3:'Option B: Gamcheon + Nampo-dong + Jagalchi',day3_li4:'Head back to Seoul via KTX',
      pack_eyebrow:'Packing',pack_title:'What to Bring',
      pack_desc:'June in Korea is warm, humid, and rainy — check the weather daily and pack light.',
      pk1:'Passport & concert ticket',pk2:'Hotel booking confirmation',
      pk3:'eSIM or local SIM card',pk4:'Portable charger (essential)',
      pk5:'Comfortable shoes',pk6:'Light jacket / rain gear',
      pk7:'Small bag (venue-compliant size)',pk8:'Cash + credit card',
      pk9:'T-money transport card',pk10:'Translation app',
      pk11:'Personal medication if needed',pk12:'Optional: ear protection',
      safety_eyebrow:'Safety',safety_title:'Solo Traveler Tips',
      safety_desc:'Busan is a safe city, but a little preparation goes a long way.',
      sf1_title:'Stay Connected',sf1_desc:'Share your hotel location with a trusted contact. Save your hotel address in Korean on your phone — it makes taxi rides and navigation much easier.',
      sf2_title:'Getting Around Safely',sf2_desc:'Use official taxis or reliable ride apps. Avoid unofficial ticket and merchandise deals. Know the last subway departure time.',
      sf3_title:'Travel Insurance',sf3_desc:"Consider travel insurance covering flights, hotel, and medical expenses. Concert weekends can be unpredictable.",
      sf4_title:'Avoid Ticket Scams',sf4_desc:'Only buy tickets through NOL Ticket (official seller). Scams targeting international fans are common.',
      cta_eyebrow:'K-POPSTAY BUSAN 2026',
      cta_title:'Need a Place to Stay in Busan?',
      cta_desc:'Apply for a <strong>free 2-night stay</strong> with a verified Busan citizen host through K-POPSTAY BUSAN. Priority given to international ARMY.',
      cta_apply:'Apply for Free Stay ›',cta_more:'Learn More',
      footer_ref:'Content reference: koreareadyguide.com'
    },
    ja:{
      back:'← ホーム', apply:'今すぐ申し込む ›',
      hero_eyebrow:'釜山旅行ガイド2026',
      hero_title:'BTSコンサート<br><span>旅行ガイド</span>',
      hero_sub:'宿泊先、交通手段、観光スポット — ARMY必携の2026年6月釜山旅行情報。',
      concert_h:"BTS WORLD TOUR 'ARIRANG' IN BUSAN — 基本情報",
      cb_dates:'日程',cb_dates_v:'2026年6月12–13日',
      cb_time:'時間',cb_time_v:'午後7:00 KST',
      cb_venue:'会場',cb_venue_v:'釜山アジアード主競技場',
      cb_ticket:'チケット販売',cb_ticket_v:'NOL Ticket（公式）',
      cb_stream:'ストリーミング',cb_stream_v:'Weverse Concerts',
      cb_age:'年齢制限',cb_age_v:'9歳以上',
      warn:'<strong>チケット詐欺注意:</strong> 必ず<strong>NOL Ticket</strong>（公式販売サイト）で購入してください。海外ファンを狙った詐欺が多発しています。BTS/Weverse公式チャンネルで必ず確認を。',
      why_eyebrow:'なぜ釜山か',why_title:'コンサート以上の街',
      why_desc:'釜山はジミンとジョングクの故郷です。ツアーに合わせた大規模なエンターテインメントが市内全体で計画されており、スタジアムを超えた祭り的な目的地となります。',
      drone_h:'BTS THE CITY ARIRANG 釜山',
      drone_p:'ウェルカムセンター、スタンプラリー、ランドマーク点灯、ホテルパッケージなど市内全域のプログラム、さらに<strong>光安大橋でのドローンライトショー</strong> — 6月12・13日 午後10:00 KST。',
      stay_eyebrow:'宿泊',stay_title:'おすすめエリア',
      stay_desc:'旅のスタイルに合わせてベースを選びましょう。どのエリアもスタジアムへのアクセスが良好です。',
      area1_label:'初めての方',area1_title:'西面（ソミョン）',area1_desc:'中心地で便利、交通アクセス抜群。初めての釜山訪問者に最もおすすめ。',
      area2_label:'KTX利用者',area2_title:'釜山駅',area2_desc:'KTXを降りたらすぐ。ソウルから電車で来る方に最適。',
      area3_label:'ビーチ・リゾート',area3_title:'海雲台（ヘウンデ）',area3_desc:'韓国で最も有名なビーチ。オーシャンビュー、高級ホテル、おしゃれなカフェ。',
      area4_label:'夜景・フォト',area4_title:'光安里（クァンアンリ）',area4_desc:'光安大橋の夜景が圧巻。トレンディなカフェ・レストラン。ビーチでドローンショーも。',
      area5_label:'会場近く',area5_title:'士項・スポーツ複合施設',area5_desc:'会場から最も近いエリア。コンサート当日の移動時間を最小化したい方に。',
      area6_label:'K-POPSTAY',area6_title:'釜山市民ホストと過ごす',area6_desc:'K-POPSTAY BUSANを通じて認証済み釜山市民ホストとの<strong>無料2泊</strong>に申し込む。<a href="/apply" style="color:var(--purple);font-weight:700">今すぐ申し込む ›</a>',
      transport_eyebrow:'アクセス',transport_title:'釜山への行き方',
      transport_desc:'出発地によって3つの主な選択肢があります。',
      th_option:'方法',th_from:'出発地',th_dur:'所要時間',th_notes:'メモ',
      tr1_opt:'🚄 KTX',tr1_from:'ソウル駅',tr1_dur:'約2.5〜3時間',tr1_note:'最も人気の方法。コンサート週末は席が早く売り切れるので早めに予約を。',
      tr2_opt:'✈️ 飛行機',tr2_from:'アジア主要都市',tr2_dur:'様々',tr2_note:'金海国際空港着。海外から直接釜山へ来る方に適しています。',
      tr3_opt:'🚌 高速バス',tr3_from:'ソウルなど',tr3_dur:'4〜5時間以上',tr3_note:'最も安いが大幅に時間がかかる。コンサート週末にはおすすめしない。',
      highlight:'<strong>おすすめ旅程:</strong> ソウル到着 → 1〜3日観光 → KTXで釜山へ → コンサート週末を釜山で → その後ソウルへ戻る。公演直後にソウルへ帰るのは混雑で非現実的。',
      stadium_eyebrow:'当日の交通',stadium_title:'スタジアムへの行き方',
      stadium_desc:'釜山アジアード主競技場は蓮堤区に位置。最寄り駅：<strong>総合運動場駅</strong>・<strong>士項駅</strong>。',
      s1_title:'地下鉄を利用',s1_desc:'コンサート当日はタクシーより地下鉄を強くおすすめします。会場付近の交通が規制される場合があります。',
      s2_title:'シャトルバス',s2_desc:'KlookなどのプラットフォームでシャトルバスをWEBで予約可能。釜山駅・西面・海雲台から出発。要事前予約。',
      tips_eyebrow:'準備',tips_title:'コンサート当日のヒント',
      tips_desc:'午後7時開演のため、午後早い時間から混雑します。',
      cl_1:'午後7時開演の数時間前に出発',cl_2:'モバイルバッテリー必携',
      cl_3:'モバイルデータ準備（eSIM推奨）',cl_4:'歩きやすい靴を着用',
      cl_5:'Weverse、NOL Ticket、BTS公式をチェック',cl_6:'入場ルールを当日前に確認',
      cl_7:'最終電車の時刻を把握',cl_8:'ホテルの住所を韓国語で保存',
      attract_eyebrow:'釜山観光',attract_title:'主要スポット',
      attract_desc:'コンサート以外にも釜山を満喫しましょう。',
      th_place:'場所',th_highlights:'特徴',
      at1_p:'🏖️ 海雲台海水浴場',at1_h:'散歩道、高級ホテル、カフェ。韓国最有名のビーチ。',
      at2_p:'🌉 光安里海水浴場',at2_h:'光安大橋の夜景、おしゃれスポット、ドローンショー観覧に最適。',
      at3_p:'🎨 甘川文化村',at3_h:'カラフルな壁画と路地。フォトスポットとして有名。',
      at4_p:'🐟 チャガルチ市場',at4_h:'韓国最大の海鮮市場。獲れたての海鮮を堪能。',
      at5_p:'🍢 南浦洞 / BIFF広場',at5_h:'屋台グルメ、地元の雰囲気、旧釜山の中心地。',
      at6_p:'🏯 釜山タワー / 龍頭山公園',at6_h:'市街パノラマ。公演前の朝にのんびり立ち寄るのにぴったり。',
      itin_eyebrow:'おすすめ日程',itin_title:'3日間モデルプラン',
      itin_desc:'コンサート週末のための現実的な行程。',
      day1_label:'1日目',day1_title:'到着 &amp; チェックイン',
      day1_li1:'宿泊施設にチェックイン',day1_li2:'夜にホテル周辺を軽く散策',
      day1_li3:'西面・海雲台・光安里・南浦洞のいずれかを探索',day1_li4:'翌日に備えて早めに就寝',
      day2_label:'2日目',day2_title:'コンサート当日 🎵',
      day2_li1:'午前中は休息',day2_li2:'スタジアムへ早めに出発',
      day2_li3:'地下鉄で移動 — タクシー不可',day2_li4:"BTS WORLD TOUR 'ARIRANG'を観覧",
      day2_li5:'任意：午後10時の光安里ドローンショー',
      day3_label:'3日目',day3_title:'釜山観光',
      day3_li1:'のんびりした午前の観光',day3_li2:'コースA: 海雲台 + 光安里',
      day3_li3:'コースB: 甘川 + 南浦洞 + チャガルチ',day3_li4:'KTXでソウルへ帰宅',
      pack_eyebrow:'持ち物',pack_title:'パッキングリスト',
      pack_desc:'6月の韓国は暖かく、蒸し暑く、雨が多い。毎日天気を確認して軽めに荷造りを。',
      pk1:'パスポート &amp; コンサートチケット',pk2:'ホテル予約確認書',
      pk3:'eSIMまたは現地SIMカード',pk4:'モバイルバッテリー（必須）',
      pk5:'歩きやすい靴',pk6:'軽めのジャケット / 雨具',
      pk7:'小さめバッグ（会場規定サイズ）',pk8:'現金 + クレジットカード',
      pk9:'T-money交通カード',pk10:'翻訳アプリ',
      pk11:'常備薬',pk12:'任意：耳栓',
      safety_eyebrow:'安全',safety_title:'一人旅のヒント',
      safety_desc:'釜山は安全な街ですが、少しの準備が大きな助けになります。',
      sf1_title:'連絡を保つ',sf1_desc:'信頼できる人にホテルの場所を共有しましょう。スマホにホテルの住所を韓国語で保存しておくと便利です。',
      sf2_title:'安全に移動する',sf2_desc:'公式タクシーや信頼できるアプリを利用してください。非公式のチケット・グッズ取引は避けましょう。最終電車の時刻も確認を。',
      sf3_title:'旅行保険',sf3_desc:'航空・ホテル・医療をカバーする旅行保険への加入をおすすめします。',
      sf4_title:'チケット詐欺に注意',sf4_desc:'NOL Ticket（公式）以外では絶対に購入しないでください。海外ファンを狙った詐欺が多発しています。',
      cta_eyebrow:'K-POPSTAY BUSAN 2026',
      cta_title:'釜山の宿をお探しですか？',
      cta_desc:'K-POPSTAY BUSANを通じて認証済み釜山市民ホストとの<strong>無料2泊</strong>に申し込む。海外ARMYファン優先。',
      cta_apply:'無料宿泊に申し込む ›',cta_more:'詳細を見る',
      footer_ref:'参考: koreareadyguide.com'
    },
    zh_t:{
      back:'← 首頁', apply:'立即申請 ›',
      hero_eyebrow:'釜山旅遊指南2026',hero_title:'BTS釜山演唱會<br><span>旅遊指南</span>',
      hero_sub:'住宿、交通、景點 — 2026年6月釜山ARMY必讀指南。',
      concert_h:"BTS WORLD TOUR 'ARIRANG' IN BUSAN — 重要資訊",
      cb_dates:'日期',cb_dates_v:'2026年6月12–13日',cb_time:'時間',cb_time_v:'晚上7:00 KST',
      cb_venue:'場地',cb_venue_v:'釜山亞運主競技場',cb_ticket:'售票',cb_ticket_v:'NOL Ticket（官方）',
      cb_stream:'串流',cb_stream_v:'Weverse Concerts',cb_age:'年齡限制',cb_age_v:'9歲以上',
      warn:'<strong>購票警告：</strong>只能通過<strong>NOL Ticket</strong>（官方）購買。針對海外粉絲的詐騙十分常見，請透過官方BTS/Weverse頻道確認。',
      why_eyebrow:'為何選擇釜山',why_title:'不只是演唱會',
      why_desc:'釜山是智旻和柾國的故鄉。配合巡演，全市計劃舉辦大型娛樂活動，成為超越競技場的節慶型旅遊目的地。',
      drone_h:'BTS THE CITY ARIRANG 釜山',
      drone_p:'全市節目包括歡迎中心、集章活動、地標亮燈、酒店套餐，以及<strong>廣安大橋無人機燈光秀</strong>——6月12、13日晚上10:00 KST。',
      stay_eyebrow:'住宿',stay_title:'最佳住宿區域',
      stay_desc:'根據旅遊風格選擇根據地，以下所有區域均有方便前往競技場的交通。',
      area1_label:'首次訪客',area1_title:'西面',area1_desc:'市中心，交通便利，適合第一次到釜山的旅客。',
      area2_label:'KTX旅客',area2_title:'釜山站',area2_desc:'下KTX即到，從首爾搭火車來的旅客最佳選擇。',
      area3_label:'海灘·度假',area3_title:'海雲台',area3_desc:'韓國最著名的海灘，海景、高檔酒店、咖啡廳一應俱全。',
      area4_label:'夜景·拍照',area4_title:'廣安里',area4_desc:'廣安大橋震撼夜景，潮流咖啡廳餐廳，可在海灘觀看無人機表演。',
      area5_label:'靠近場館',area5_title:'士亭·體育複合',area5_desc:'最靠近場館，想縮短演唱會當天交通時間的首選。',
      area6_label:'K-POPSTAY',area6_title:'與釜山市民房東同住',area6_desc:'透過K-POPSTAY BUSAN申請與認證釜山市民房東<strong>免費住宿2晚</strong>。<a href="/apply" style="color:var(--purple);font-weight:700">立即申請 ›</a>',
      transport_eyebrow:'前往釜山',transport_title:'如何到釜山',transport_desc:'根據出發地選擇三種主要方式之一。',
      th_option:'方式',th_from:'出發地',th_dur:'時間',th_notes:'備註',
      tr1_opt:'🚄 KTX',tr1_from:'首爾站',tr1_dur:'約2.5–3小時',tr1_note:'最受歡迎，演唱會週末座位很快售完，請提早預訂。',
      tr2_opt:'✈️ 飛機',tr2_from:'亞洲各城市',tr2_dur:'不等',tr2_note:'抵達金海國際機場，適合從海外直飛釜山的旅客。',
      tr3_opt:'🚌 高速巴士',tr3_from:'首爾等地',tr3_dur:'4–5小時以上',tr3_note:'最便宜但耗時最長，演唱會週末不建議。',
      highlight:'<strong>建議行程：</strong>抵達首爾 → 觀光1–3天 → 搭KTX到釜山 → 演唱會週末留在釜山 → 之後返回首爾。演唱會結束後立即返回首爾並不現實。',
      stadium_eyebrow:'演唱會當天交通',stadium_title:'前往競技場',
      stadium_desc:'釜山亞運主競技場位於蓮堤區，最近地鐵站：<strong>綜合運動場站</strong>和<strong>士亭站</strong>。',
      s1_title:'搭地鐵',s1_desc:'演唱會當天強烈建議搭地鐵而非計程車。場館附近可能實施交通管制，預留充裕時間。',
      s2_title:'接駁巴士',s2_desc:'可透過Klook等平台預訂來回接駁巴士，從釜山站、西面、海雲台出發，需提早預訂。',
      tips_eyebrow:'準備',tips_title:'演唱會當天小貼士',tips_desc:'晚上7時開演，人群從下午就開始聚集，請做好準備。',
      cl_1:'提早數小時出發',cl_2:'行動電源必備',cl_3:'準備手機網路（建議eSIM）',cl_4:'穿舒適的鞋',
      cl_5:'關注Weverse、NOL Ticket及BTS官方',cl_6:'提前確認包包/入場規定',
      cl_7:'確認末班地鐵時間',cl_8:'將飯店地址以韓文存入手機',
      attract_eyebrow:'釜山景點',attract_title:'主要景點',attract_desc:'在釜山不只有演唱會可以享受。',
      th_place:'地點',th_highlights:'特色',
      at1_p:'🏖️ 海雲台海水浴場',at1_h:'散步道、高檔酒店、咖啡廳，韓國最著名海灘。',
      at2_p:'🌉 廣安里海水浴場',at2_h:'廣安大橋夜景、潮流景點、觀看無人機表演的好地方。',
      at3_p:'🎨 甘川文化村',at3_h:'彩色壁畫與小巷，著名打卡勝地。',
      at4_p:'🐟 札嘎其市場',at4_h:'韓國著名海鮮市場，嚐鮮剛捕撈的海鮮。',
      at5_p:'🍢 南浦洞 / BIFF廣場',at5_h:'街頭小吃、當地氛圍、舊釜山核心地帶。',
      at6_p:'🏯 釜山塔 / 龍頭山公園',at6_h:'360度城市全景，演唱會前悠閒的晨間行程。',
      itin_eyebrow:'行程建議',itin_title:'3天範例行程',itin_desc:'演唱會週末的實用行程規劃。',
      day1_label:'第1天',day1_title:'抵達 &amp; 安頓',
      day1_li1:'入住飯店',day1_li2:'傍晚在附近輕鬆散步',
      day1_li3:'探索西面、海雲台、廣安里或南浦洞其中一個',day1_li4:'早點休息',
      day2_label:'第2天',day2_title:'演唱會日 🎵',
      day2_li1:'上午休息',day2_li2:'提早出發前往競技場',
      day2_li3:'搭地鐵，避開計程車',day2_li4:"觀看BTS WORLD TOUR 'ARIRANG'",
      day2_li5:'可選：晚上10時廣安里無人機表演',
      day3_label:'第3天',day3_title:'釜山觀光',
      day3_li1:'悠閒上午觀光',day3_li2:'路線A：海雲台 + 廣安里',
      day3_li3:'路線B：甘川 + 南浦洞 + 札嘎其',day3_li4:'搭KTX返回首爾',
      pack_eyebrow:'行李',pack_title:'行李清單',pack_desc:'韓國6月天氣溫暖潮濕且多雨，每天查看天氣、輕裝上陣。',
      pk1:'護照 &amp; 演唱會門票',pk2:'飯店訂房確認書',pk3:'eSIM或當地SIM卡',pk4:'行動電源（必備）',
      pk5:'舒適的鞋',pk6:'輕薄外套 / 雨具',pk7:'小包包（符合場館規定）',pk8:'現金 + 信用卡',
      pk9:'T-money交通卡',pk10:'翻譯App',pk11:'個人常備藥',pk12:'可選：耳塞',
      safety_eyebrow:'安全',safety_title:'獨行旅客小貼士',safety_desc:'釜山是安全的城市，但做好準備大有幫助。',
      sf1_title:'保持聯繫',sf1_desc:'將飯店位置分享給信任的人，並將飯店地址以韓文存入手機，方便搭計程車和導航。',
      sf2_title:'安全出行',sf2_desc:'使用官方計程車或可靠的叫車App，避免非官方票券及周邊商品交易，確認末班地鐵時間。',
      sf3_title:'旅遊保險',sf3_desc:'建議購買涵蓋機票、飯店及醫療的旅遊保險，演唱會週末難免有突發狀況。',
      sf4_title:'避免購票詐騙',sf4_desc:'只透過NOL Ticket（官方）購買，針對海外粉絲的詐騙很常見。',
      cta_eyebrow:'K-POPSTAY BUSAN 2026',cta_title:'需要釜山住宿嗎？',
      cta_desc:'透過K-POPSTAY BUSAN申請與認證釜山市民房東<strong>免費住宿2晚</strong>，海外ARMY優先。',
      cta_apply:'申請免費住宿 ›',cta_more:'了解更多',footer_ref:'參考資料：koreareadyguide.com'
    },
    zh_s:{
      back:'← 首页',apply:'立即申请 ›',
      hero_eyebrow:'釜山旅游指南2026',hero_title:'BTS釜山演唱会<br><span>旅游指南</span>',
      hero_sub:'住宿、交通、景点 — 2026年6月釜山ARMY必读指南。',
      concert_h:"BTS WORLD TOUR 'ARIRANG' IN BUSAN — 重要信息",
      cb_dates:'日期',cb_dates_v:'2026年6月12–13日',cb_time:'时间',cb_time_v:'晚上7:00 KST',
      cb_venue:'场地',cb_venue_v:'釜山亚运主体育场',cb_ticket:'售票',cb_ticket_v:'NOL Ticket（官方）',
      cb_stream:'直播',cb_stream_v:'Weverse Concerts',cb_age:'年龄限制',cb_age_v:'9岁以上',
      warn:'<strong>购票警告：</strong>只能通过<strong>NOL Ticket</strong>（官方）购买。针对海外粉丝的诈骗十分常见，请通过官方BTS/Weverse频道确认。',
      why_eyebrow:'为何选择釜山',why_title:'不只是演唱会',
      why_desc:'釜山是智旻和柾国的故乡。配合巡演，全市计划举办大型娱乐活动，成为超越体育场的节庆型旅游目的地。',
      drone_h:'BTS THE CITY ARIRANG 釜山',
      drone_p:'全市节目包括欢迎中心、集章活动、地标亮灯、酒店套餐，以及<strong>广安大桥无人机灯光秀</strong>——6月12、13日晚上10:00 KST。',
      stay_eyebrow:'住宿',stay_title:'最佳住宿区域',
      stay_desc:'根据旅游风格选择根据地，以下所有区域均有方便前往体育场的交通。',
      area1_label:'首次访客',area1_title:'西面',area1_desc:'市中心，交通便利，适合第一次到釜山的游客。',
      area2_label:'KTX旅客',area2_title:'釜山站',area2_desc:'下KTX即到，从首尔坐火车来的旅客最佳选择。',
      area3_label:'海滩·度假',area3_title:'海云台',area3_desc:'韩国最著名的海滩，海景、高档酒店、咖啡厅一应俱全。',
      area4_label:'夜景·拍照',area4_title:'广安里',area4_desc:'广安大桥震撼夜景，潮流咖啡餐厅，可在海滩观看无人机表演。',
      area5_label:'靠近场馆',area5_title:'士亭·体育综合',area5_desc:'最靠近场馆，想缩短演唱会当天交通时间的首选。',
      area6_label:'K-POPSTAY',area6_title:'与釜山市民房东同住',area6_desc:'通过K-POPSTAY BUSAN申请与认证釜山市民房东<strong>免费住宿2晚</strong>。<a href="/apply" style="color:var(--purple);font-weight:700">立即申请 ›</a>',
      transport_eyebrow:'前往釜山',transport_title:'如何到釜山',transport_desc:'根据出发地选择三种主要方式之一。',
      th_option:'方式',th_from:'出发地',th_dur:'时间',th_notes:'备注',
      tr1_opt:'🚄 KTX',tr1_from:'首尔站',tr1_dur:'约2.5–3小时',tr1_note:'最受欢迎，演唱会周末座位很快售完，请提早预订。',
      tr2_opt:'✈️ 飞机',tr2_from:'亚洲各城市',tr2_dur:'不等',tr2_note:'抵达金海国际机场，适合从海外直飞釜山的旅客。',
      tr3_opt:'🚌 高速巴士',tr3_from:'首尔等地',tr3_dur:'4–5小时以上',tr3_note:'最便宜但耗时最长，演唱会周末不建议。',
      highlight:'<strong>建议行程：</strong>抵达首尔 → 观光1–3天 → 搭KTX到釜山 → 演唱会周末留在釜山 → 之后返回首尔。演唱会结束后立即返回首尔并不现实。',
      stadium_eyebrow:'演唱会当天交通',stadium_title:'前往体育场',
      stadium_desc:'釜山亚运主体育场位于莲堤区，最近地铁站：<strong>综合运动场站</strong>和<strong>士亭站</strong>。',
      s1_title:'坐地铁',s1_desc:'演唱会当天强烈建议坐地铁而非出租车。场馆附近可能实施交通管制，预留充裕时间。',
      s2_title:'接驳巴士',s2_desc:'可通过Klook等平台预订来回接驳巴士，从釜山站、西面、海云台出发，需提早预订。',
      tips_eyebrow:'准备',tips_title:'演唱会当天小贴士',tips_desc:'晚上7时开演，人群从下午就开始聚集，请做好准备。',
      cl_1:'提早数小时出发',cl_2:'移动电源必备',cl_3:'准备手机网络（建议eSIM）',cl_4:'穿舒适的鞋',
      cl_5:'关注Weverse、NOL Ticket及BTS官方',cl_6:'提前确认包包/入场规定',
      cl_7:'确认末班地铁时间',cl_8:'将酒店地址以韩文存入手机',
      attract_eyebrow:'釜山景点',attract_title:'主要景点',attract_desc:'在釜山不只有演唱会可以享受。',
      th_place:'地点',th_highlights:'特色',
      at1_p:'🏖️ 海云台海水浴场',at1_h:'散步道、高档酒店、咖啡厅，韩国最著名海滩。',
      at2_p:'🌉 广安里海水浴场',at2_h:'广安大桥夜景、潮流景点、观看无人机表演的好地方。',
      at3_p:'🎨 甘川文化村',at3_h:'彩色壁画与小巷，著名打卡胜地。',
      at4_p:'🐟 扎嘎其市场',at4_h:'韩国著名海鲜市场，品尝刚捕捞的海鲜。',
      at5_p:'🍢 南浦洞 / BIFF广场',at5_h:'街头小吃、当地氛围、旧釜山核心地带。',
      at6_p:'🏯 釜山塔 / 龙头山公园',at6_h:'360度城市全景，演唱会前悠闲的晨间行程。',
      itin_eyebrow:'行程建议',itin_title:'3天示例行程',itin_desc:'演唱会周末的实用行程规划。',
      day1_label:'第1天',day1_title:'抵达 &amp; 安顿',
      day1_li1:'入住酒店',day1_li2:'傍晚在附近轻松散步',
      day1_li3:'探索西面、海云台、广安里或南浦洞',day1_li4:'早点休息',
      day2_label:'第2天',day2_title:'演唱会日 🎵',
      day2_li1:'上午休息',day2_li2:'提早出发前往体育场',
      day2_li3:'坐地铁，避开出租车',day2_li4:"观看BTS WORLD TOUR 'ARIRANG'",
      day2_li5:'可选：晚上10时广安里无人机表演',
      day3_label:'第3天',day3_title:'釜山观光',
      day3_li1:'悠闲上午观光',day3_li2:'路线A：海云台 + 广安里',
      day3_li3:'路线B：甘川 + 南浦洞 + 扎嘎其',day3_li4:'搭KTX返回首尔',
      pack_eyebrow:'行李',pack_title:'行李清单',pack_desc:'韩国6月天气温暖潮湿且多雨，每天查看天气、轻装出行。',
      pk1:'护照 &amp; 演唱会门票',pk2:'酒店订房确认书',pk3:'eSIM或当地SIM卡',pk4:'移动电源（必备）',
      pk5:'舒适的鞋',pk6:'轻薄外套 / 雨具',pk7:'小包（符合场馆规定）',pk8:'现金 + 信用卡',
      pk9:'T-money交通卡',pk10:'翻译App',pk11:'个人常备药',pk12:'可选：耳塞',
      safety_eyebrow:'安全',safety_title:'独行旅客小贴士',safety_desc:'釜山是安全的城市，但做好准备大有帮助。',
      sf1_title:'保持联系',sf1_desc:'将酒店位置分享给信任的人，并将酒店地址以韩文存入手机，方便打车和导航。',
      sf2_title:'安全出行',sf2_desc:'使用官方出租车或可靠的叫车App，避免非官方票券及周边商品交易，确认末班地铁时间。',
      sf3_title:'旅游保险',sf3_desc:'建议购买涵盖机票、酒店及医疗的旅游保险，演唱会周末难免有突发状况。',
      sf4_title:'避免购票诈骗',sf4_desc:'只通过NOL Ticket（官方）购买，针对海外粉丝的诈骗很常见。',
      cta_eyebrow:'K-POPSTAY BUSAN 2026',cta_title:'需要釜山住宿吗？',
      cta_desc:'通过K-POPSTAY BUSAN申请与认证釜山市民房东<strong>免费住宿2晚</strong>，海外ARMY优先。',
      cta_apply:'申请免费住宿 ›',cta_more:'了解更多',footer_ref:'参考资料：koreareadyguide.com'
    },
    id:{
      back:'← Beranda',apply:'Daftar Sekarang ›',
      hero_eyebrow:'Panduan Wisata Busan 2026',hero_title:'Panduan Wisata<br><span>Konser BTS Busan</span>',
      hero_sub:'Tempat menginap, cara ke sana, aktivitas — semua yang perlu diketahui ARMY untuk Busan, Juni 2026.',
      concert_h:"BTS WORLD TOUR 'ARIRANG' IN BUSAN — Informasi Penting",
      cb_dates:'Tanggal',cb_dates_v:'12–13 Juni 2026',cb_time:'Waktu',cb_time_v:'19:00 KST',
      cb_venue:'Venue',cb_venue_v:'Busan Asiad Main Stadium',cb_ticket:'Penjual Tiket',cb_ticket_v:'NOL Ticket (Resmi)',
      cb_stream:'Streaming',cb_stream_v:'Weverse Concerts',cb_age:'Batas Usia',cb_age_v:'9 tahun ke atas',
      warn:'<strong>Peringatan Tiket:</strong> Hanya beli melalui <strong>NOL Ticket</strong> (penjual resmi). Penipuan yang menyasar penggemar internasional sangat umum. Verifikasi semua pembelian melalui saluran resmi BTS/Weverse.',
      why_eyebrow:'Mengapa Busan',why_title:'Lebih dari Sekadar Konser',
      why_desc:'Busan adalah kota asal Jimin dan Jungkook. Kota ini merencanakan hiburan berskala besar yang terkait dengan tur, menjadikannya destinasi festival melampaui sekadar stadion.',
      drone_h:'BTS THE CITY ARIRANG Busan',
      drone_p:'Program kota meliputi welcome center, stamp rally, penerangan landmark, paket hotel, dan <strong>drone light show di Jembatan Gwangandaegyo</strong> — 12 & 13 Juni pukul 22:00 KST.',
      stay_eyebrow:'Akomodasi',stay_title:'Area Terbaik untuk Menginap',
      stay_desc:'Pilih basis sesuai gaya perjalanan Anda. Semua area di bawah memiliki akses transportasi yang baik ke stadion.',
      area1_label:'Pertama kali',area1_title:'Seomyeon',area1_desc:'Pusat kota, nyaman, koneksi transportasi bagus. Terbaik untuk pertama kali ke Busan.',
      area2_label:'Pengguna KTX',area2_title:'Stasiun Busan',area2_desc:'Turun KTX dan sudah sampai. Ideal untuk yang datang dari Seoul dengan kereta.',
      area3_label:'Pantai & Liburan',area3_title:'Haeundae',area3_desc:'Pantai paling terkenal di Korea. Pemandangan laut, hotel mewah, dan kafe yang ramai.',
      area4_label:'Pemandangan Malam',area4_title:'Gwangalli',area4_desc:'Pemandangan malam Gwangan Bridge yang memukau. Kafe trendi dan spot foto bagus. Nonton drone show dari pantai.',
      area5_label:'Dekat Stadion',area5_title:'Sajik / Sports Complex',area5_desc:'Paling dekat dengan venue. Pilihan praktis jika ingin meminimalkan waktu perjalanan.',
      area6_label:'K-POPSTAY',area6_title:'Menginap dengan Warga Busan',area6_desc:'Daftar <strong>menginap gratis 2 malam</strong> bersama tuan rumah warga Busan terverifikasi melalui K-POPSTAY BUSAN. <a href="/apply" style="color:var(--purple);font-weight:700">Daftar sekarang ›</a>',
      transport_eyebrow:'Cara ke Busan',transport_title:'Bagaimana Menuju Busan',transport_desc:'Tiga pilihan utama tergantung dari mana Anda berangkat.',
      th_option:'Pilihan',th_from:'Dari',th_dur:'Durasi',th_notes:'Catatan',
      tr1_opt:'🚄 KTX',tr1_from:'Stasiun Seoul',tr1_dur:'~2.5–3 jam',tr1_note:'Pilihan paling populer. Pesan lebih awal — kursi cepat habis saat akhir pekan konser.',
      tr2_opt:'✈️ Terbang',tr2_from:'Kota Asia lainnya',tr2_dur:'Beragam',tr2_note:'Tiba di Bandara Internasional Gimhae. Cocok untuk wisatawan internasional yang langsung ke Busan.',
      tr3_opt:'🚌 Bus Ekspres',tr3_from:'Seoul & kota lain',tr3_dur:'4–5+ jam',tr3_note:'Termurah tapi jauh lebih lama. Tidak disarankan untuk akhir pekan konser.',
      highlight:'<strong>Rencana yang disarankan:</strong> Tiba via Seoul → 1–3 hari wisata → naik KTX ke Busan → menginap untuk akhir pekan konser → kembali ke Seoul setelahnya. Hindari mencoba kembali ke Seoul langsung setelah pertunjukan.',
      stadium_eyebrow:'Transportasi Hari Konser',stadium_title:'Menuju Stadion',
      stadium_desc:'Busan Asiad Main Stadium di Yeonje-gu. Stasiun subway terdekat: <strong>Sports Complex Station</strong> dan <strong>Sajik Station</strong>.',
      s1_title:'Naik Subway',s1_desc:'Subway sangat disarankan daripada taksi pada hari konser. Lalu lintas dekat venue mungkin dibatasi. Siapkan waktu perjalanan lebih lama.',
      s2_title:'Bus Shuttle',s2_desc:'Bus shuttle pulang-pergi tersedia melalui platform seperti Klook. Penjemputan dari Stasiun Busan, Seomyeon, dan Haeundae. Pesan lebih awal.',
      tips_eyebrow:'Persiapan',tips_title:'Tips Hari Konser',tips_desc:'Pertunjukan pukul 19:00 berarti keramaian mulai dari sore hari.',
      cl_1:'Berangkat beberapa jam sebelum pukul 19:00',cl_2:'Bawa power bank — sangat penting',
      cl_3:'Siapkan data mobile (eSIM disarankan)',cl_4:'Kenakan sepatu nyaman',
      cl_5:'Pantau Weverse, NOL Ticket, dan halaman tur BTS',cl_6:'Cek aturan tas/masuk sebelum hari H',
      cl_7:'Ketahui waktu subway terakhir',cl_8:'Simpan alamat hotel dalam bahasa Korea',
      attract_eyebrow:'Jelajahi Busan',attract_title:'Atraksi Utama',attract_desc:'Manfaatkan waktu di Busan selain konser.',
      th_place:'Tempat',th_highlights:'Keunggulan',
      at1_p:'🏖️ Pantai Haeundae',at1_h:'Jalan pantai, hotel mewah, kafe. Pantai paling terkenal di Korea.',
      at2_p:'🌉 Pantai Gwangalli',at2_h:'Pemandangan malam Gwangan Bridge, spot trendi, bagus untuk drone show.',
      at3_p:'🎨 Desa Budaya Gamcheon',at3_h:'Mural warna-warni dan gang yang menanjak. Spot foto yang bagus.',
      at4_p:'🐟 Pasar Jagalchi',at4_h:'Pasar seafood terkenal Korea. Cicipi seafood segar.',
      at5_p:'🍢 Nampo-dong / BIFF Square',at5_h:'Makanan jalanan, suasana lokal, jantung Busan lama.',
      at6_p:'🏯 Menara Busan / Taman Yongdusan',at6_h:'Pemandangan kota panoramik. Cocok untuk pagi santai sebelum pertunjukan.',
      itin_eyebrow:'Rencana Perjalanan',itin_title:'Itinerary 3 Hari',itin_desc:'Struktur praktis untuk akhir pekan konser.',
      day1_label:'Hari 1',day1_title:'Tiba &amp; Beres-beres',
      day1_li1:'Check in penginapan',day1_li2:'Jalan santai malam di sekitar hotel',
      day1_li3:'Jelajahi Seomyeon, Haeundae, Gwangalli, atau Nampo-dong',day1_li4:'Istirahat lebih awal',
      day2_label:'Hari 2',day2_title:'Hari Konser 🎵',
      day2_li1:'Istirahat di pagi hari',day2_li2:'Berangkat lebih awal ke stadion',
      day2_li3:'Naik subway — hindari taksi',day2_li4:"Hadiri BTS WORLD TOUR 'ARIRANG'",
      day2_li5:'Opsional: Drone show Gwangalli pukul 22:00',
      day3_label:'Hari 3',day3_title:'Jelajahi Busan',
      day3_li1:'Wisata santai pagi',day3_li2:'Pilihan A: Haeundae + Gwangalli',
      day3_li3:'Pilihan B: Gamcheon + Nampo-dong + Jagalchi',day3_li4:'Kembali ke Seoul via KTX',
      pack_eyebrow:'Perlengkapan',pack_title:'Apa yang Harus Dibawa',pack_desc:'Juni di Korea hangat, lembap, dan sering hujan — cek cuaca setiap hari dan packing ringan.',
      pk1:'Paspor &amp; tiket konser',pk2:'Konfirmasi pemesanan hotel',
      pk3:'eSIM atau SIM lokal',pk4:'Power bank (penting)',
      pk5:'Sepatu nyaman',pk6:'Jaket tipis / jas hujan',
      pk7:'Tas kecil (sesuai ukuran venue)',pk8:'Uang tunai + kartu kredit',
      pk9:'Kartu transportasi T-money',pk10:'Aplikasi penerjemah',
      pk11:'Obat pribadi jika diperlukan',pk12:'Opsional: pelindung telinga',
      safety_eyebrow:'Keamanan',safety_title:'Tips Wisatawan Solo',safety_desc:'Busan adalah kota yang aman, tapi sedikit persiapan sangat membantu.',
      sf1_title:'Tetap Terhubung',sf1_desc:'Bagikan lokasi hotel kepada orang yang dipercaya. Simpan alamat hotel dalam bahasa Korea di ponsel untuk memudahkan naik taksi dan navigasi.',
      sf2_title:'Bepergian dengan Aman',sf2_desc:'Gunakan taksi resmi atau aplikasi terpercaya. Hindari transaksi tiket dan merchandise tidak resmi. Ketahui waktu subway terakhir.',
      sf3_title:'Asuransi Perjalanan',sf3_desc:'Pertimbangkan asuransi perjalanan yang mencakup penerbangan, hotel, dan medis.',
      sf4_title:'Hindari Penipuan Tiket',sf4_desc:'Hanya beli tiket melalui NOL Ticket (resmi). Penipuan yang menyasar penggemar internasional sangat umum.',
      cta_eyebrow:'K-POPSTAY BUSAN 2026',cta_title:'Butuh Tempat Menginap di Busan?',
      cta_desc:'Daftar <strong>menginap gratis 2 malam</strong> bersama tuan rumah warga Busan terverifikasi melalui K-POPSTAY BUSAN. Prioritas ARMY internasional.',
      cta_apply:'Daftar Menginap Gratis ›',cta_more:'Pelajari Lebih Lanjut',
      footer_ref:'Referensi konten: koreareadyguide.com'
    }
  };

  // travel-guide.html 전용 번역 함수
  function applyTranslationsTravelGuide(){
    var lg = lang;
    var d = TG[lg] || TG['en'];
    function q(sel,v){ var el=document.querySelector(sel); if(el) el.innerHTML=v; }
    function qa(sel,v){ document.querySelectorAll(sel).forEach(function(el){el.textContent=v;}); }

    document.documentElement.lang = lg==='zh_t'?'zh-TW':lg==='zh_s'?'zh-CN':lg==='ja'?'ja':lg==='id'?'id':lg==='ko'?'ko':'en';

    // NAV
    var lbl=document.getElementById('kpopLangCurLabel'); if(lbl) lbl.textContent=window.KPOP_LANG_LABEL||'EN';
    q('#tgBtnBack', d.back);
    q('#tgBtnApply', d.apply);

    // HERO
    q('.hero-eyebrow', d.hero_eyebrow);
    q('.hero-title', d.hero_title);
    q('.hero-sub', d.hero_sub);

    // CONCERT BANNER
    q('.concert-banner h3', d.concert_h);
    var cbItems = document.querySelectorAll('.cb-item');
    var cbData = [
      [d.cb_dates,d.cb_dates_v],[d.cb_time,d.cb_time_v],[d.cb_venue,d.cb_venue_v],
      [d.cb_ticket,d.cb_ticket_v],[d.cb_stream,d.cb_stream_v],[d.cb_age,d.cb_age_v]
    ];
    cbItems.forEach(function(item,i){
      if(!cbData[i]) return;
      var lv=item.querySelector('.cb-item-label'); if(lv) lv.textContent=cbData[i][0];
      var vv=item.querySelector('.cb-item-val'); if(vv) vv.textContent=cbData[i][1];
    });
    var warnDiv = document.querySelector('.warn-box div'); if(warnDiv) warnDiv.innerHTML=d.warn;

    // WHY BUSAN
    q('.section:nth-of-type(2) .section-eyebrow', d.why_eyebrow);
    q('.section:nth-of-type(2) .section-title', d.why_title);
    q('.section:nth-of-type(2) .section-desc', d.why_desc);
    q('.drone-banner-text h4', d.drone_h);
    q('.drone-banner-text p', d.drone_p);

    // WHERE TO STAY
    var staySec = document.querySelector('#staySection');
    if(staySec){
      q('#staySection .section-eyebrow', d.stay_eyebrow);
      q('#staySection .section-title', d.stay_title);
      q('#staySection .section-desc', d.stay_desc);
    }
    var areaCards = document.querySelectorAll('.stay-card');
    var areaData=[
      [d.area1_label,d.area1_title,d.area1_desc],
      [d.area2_label,d.area2_title,d.area2_desc],
      [d.area3_label,d.area3_title,d.area3_desc],
      [d.area4_label,d.area4_title,d.area4_desc],
      [d.area5_label,d.area5_title,d.area5_desc],
      [d.area6_label,d.area6_title,d.area6_desc]
    ];
    areaCards.forEach(function(card,i){
      if(!areaData[i]) return;
      var cl=card.querySelector('.card-label'); if(cl) cl.textContent=areaData[i][0];
      var ct=card.querySelector('.card-title'); if(ct) ct.textContent=areaData[i][1];
      var cd=card.querySelector('.card-desc'); if(cd) cd.innerHTML=areaData[i][2];
    });

    // TRANSPORT
    q('#transportSection .section-eyebrow', d.transport_eyebrow);
    q('#transportSection .section-title', d.transport_title);
    q('#transportSection .section-desc', d.transport_desc);
    var tblHeads = document.querySelectorAll('#transportSection .tbl thead th');
    [[d.th_option],[d.th_from],[d.th_dur],[d.th_notes]].forEach(function(v,i){ if(tblHeads[i]) tblHeads[i].textContent=v[0]; });
    var trData=[[d.tr1_opt,d.tr1_from,d.tr1_dur,d.tr1_note],[d.tr2_opt,d.tr2_from,d.tr2_dur,d.tr2_note],[d.tr3_opt,d.tr3_from,d.tr3_dur,d.tr3_note]];
    var tblRows = document.querySelectorAll('#transportSection .tbl tbody tr');
    tblRows.forEach(function(row,i){
      if(!trData[i]) return;
      var tds=row.querySelectorAll('td');
      trData[i].forEach(function(v,j){ if(tds[j]) tds[j].textContent=v; });
    });
    var hlBox = document.querySelector('#transportSection .highlight-box'); if(hlBox) hlBox.innerHTML=d.highlight;

    // STADIUM
    q('#stadiumSection .section-eyebrow', d.stadium_eyebrow);
    q('#stadiumSection .section-title', d.stadium_title);
    q('#stadiumSection .section-desc', d.stadium_desc);
    var sCards = document.querySelectorAll('.stadium-card');
    [[d.s1_title,d.s1_desc],[d.s2_title,d.s2_desc]].forEach(function(v,i){
      if(!sCards[i]) return;
      var t=sCards[i].querySelector('.card-title'); if(t) t.textContent=v[0];
      var dc=sCards[i].querySelector('.card-desc'); if(dc) dc.textContent=v[1];
    });

    // TIPS
    q('#tipsSection .section-eyebrow', d.tips_eyebrow);
    q('#tipsSection .section-title', d.tips_title);
    q('#tipsSection .section-desc', d.tips_desc);
    var clItems = document.querySelectorAll('.checklist-item');
    var clData=[d.cl_1,d.cl_2,d.cl_3,d.cl_4,d.cl_5,d.cl_6,d.cl_7,d.cl_8];
    clItems.forEach(function(el,i){ if(clData[i]) el.textContent=clData[i]; });

    // ATTRACTIONS
    q('#attractSection .section-eyebrow', d.attract_eyebrow);
    q('#attractSection .section-title', d.attract_title);
    q('#attractSection .section-desc', d.attract_desc);
    var atHeads = document.querySelectorAll('#attractSection .tbl thead th');
    if(atHeads[0]) atHeads[0].textContent=d.th_place;
    if(atHeads[1]) atHeads[1].textContent=d.th_highlights;
    var atData=[[d.at1_p,d.at1_h],[d.at2_p,d.at2_h],[d.at3_p,d.at3_h],[d.at4_p,d.at4_h],[d.at5_p,d.at5_h],[d.at6_p,d.at6_h]];
    var atRows = document.querySelectorAll('#attractSection .tbl tbody tr');
    atRows.forEach(function(row,i){
      if(!atData[i]) return;
      var tds=row.querySelectorAll('td');
      if(tds[0]) tds[0].textContent=atData[i][0];
      if(tds[1]) tds[1].textContent=atData[i][1];
    });

    // ITINERARY
    q('#itinSection .section-eyebrow', d.itin_eyebrow);
    q('#itinSection .section-title', d.itin_title);
    q('#itinSection .section-desc', d.itin_desc);
    var dayCards = document.querySelectorAll('.itin-card');
    var dayData=[
      [d.day1_label,d.day1_title,[d.day1_li1,d.day1_li2,d.day1_li3,d.day1_li4]],
      [d.day2_label,d.day2_title,[d.day2_li1,d.day2_li2,d.day2_li3,d.day2_li4,d.day2_li5]],
      [d.day3_label,d.day3_title,[d.day3_li1,d.day3_li2,d.day3_li3,d.day3_li4]]
    ];
    dayCards.forEach(function(card,i){
      if(!dayData[i]) return;
      var dl=card.querySelector('.itin-day'); if(dl) dl.textContent=dayData[i][0];
      var dt=card.querySelector('.itin-title'); if(dt) dt.innerHTML=dayData[i][1];
      var lis=card.querySelectorAll('.itin-list li');
      dayData[i][2].forEach(function(v,j){ if(lis[j]) lis[j].textContent=v; });
    });

    // PACKING
    q('#packSection .section-eyebrow', d.pack_eyebrow);
    q('#packSection .section-title', d.pack_title);
    q('#packSection .section-desc', d.pack_desc);
    var pkItems = document.querySelectorAll('.pack-checklist .checklist-item');
    var pkData=[d.pk1,d.pk2,d.pk3,d.pk4,d.pk5,d.pk6,d.pk7,d.pk8,d.pk9,d.pk10,d.pk11,d.pk12];
    pkItems.forEach(function(el,i){ if(pkData[i]) el.innerHTML=pkData[i]; });

    // SAFETY
    q('#safetySection .section-eyebrow', d.safety_eyebrow);
    q('#safetySection .section-title', d.safety_title);
    q('#safetySection .section-desc', d.safety_desc);
    var sfCards = document.querySelectorAll('.safety-card');
    var sfData=[[d.sf1_title,d.sf1_desc],[d.sf2_title,d.sf2_desc],[d.sf3_title,d.sf3_desc],[d.sf4_title,d.sf4_desc]];
    sfCards.forEach(function(card,i){
      if(!sfData[i]) return;
      var t=card.querySelector('.card-title'); if(t) t.textContent=sfData[i][0];
      var dc=card.querySelector('.card-desc'); if(dc) dc.textContent=sfData[i][1];
    });

    // CTA
    var ctaSec = document.querySelector('#ctaSection');
    if(ctaSec){
      var ce=ctaSec.querySelector('[data-cta="eyebrow"]'); if(ce) ce.textContent=d.cta_eyebrow;
      var ct=ctaSec.querySelector('[data-cta="title"]'); if(ct) ct.textContent=d.cta_title;
      var cd2=ctaSec.querySelector('[data-cta="desc"]'); if(cd2) cd2.innerHTML=d.cta_desc;
      var ca=ctaSec.querySelector('[data-cta="apply"]'); if(ca) ca.textContent=d.cta_apply;
      var cm=ctaSec.querySelector('[data-cta="more"]'); if(cm) cm.textContent=d.cta_more;
    }

    // FOOTER
    var fref=document.querySelector('[data-footer-ref]'); if(fref) fref.textContent=d.footer_ref;
  }

  // about.html 전용 번역 함수
  function applyTranslationsAbout(){
    var t = window.kpopT;
    function q(sel,txt){var el=document.querySelector(sel);if(el)el.textContent=txt;}
    function qh(sel,html){var el=document.querySelector(sel);if(el)el.innerHTML=html;}

    document.documentElement.lang = lang==='zh_t'?'zh-TW':lang==='zh_s'?'zh-CN':lang==='ja'?'ja':lang==='id'?'id':lang==='ko'?'ko':'en';

    // NAV
    var lbl=document.getElementById('kpopLangCurLabel'); if(lbl) lbl.textContent=window.KPOP_LANG_LABEL||'EN';
    var cta=document.getElementById('navApplyCta'); if(cta) cta.textContent=t('about_nav_apply');

    // HERO
    q('.hero-eyebrow', t('about_hero_eyebrow'));
    q('.hero-title', t('about_hero_title'));
    q('.hero-sub', t('about_hero_sub'));

    // OVERVIEW
    q('#overview .section-eyebrow', t('about_ov_eyebrow'));
    q('#overview .section-title', t('about_ov_title'));
    q('#overview .section-desc', t('about_ov_desc'));
    var ovCards = document.querySelectorAll('.overview-card');
    if(ovCards[0]){ ovCards[0].querySelector('.overview-label').textContent=t('about_ov_label1'); ovCards[0].querySelector('p').textContent=t('about_ov_p1'); }
    if(ovCards[1]){ ovCards[1].querySelector('.overview-label').textContent=t('about_ov_label2'); ovCards[1].querySelector('p').textContent=t('about_ov_p2'); }

    // VALUES
    q('#values .section-eyebrow', t('about_val_eyebrow'));
    q('#values .section-title', t('about_val_title'));
    q('#values .section-desc', t('about_val_desc'));
    var vCards = document.querySelectorAll('.value-card');
    var vData = [
      ['about_val1_type','about_val1_title','about_val1_li1','about_val1_li2','about_val1_li3'],
      ['about_val2_type','about_val2_title','about_val2_li1','about_val2_li2','about_val2_li3'],
      ['about_val3_type','about_val3_title','about_val3_li1','about_val3_li2','about_val3_li3'],
    ];
    vCards.forEach(function(card,i){
      if(!vData[i]) return;
      var vt=card.querySelector('.value-type'); if(vt) vt.textContent=t(vData[i][0]);
      var tt=card.querySelector('.value-title'); if(tt) tt.textContent=t(vData[i][1]);
      var lis=card.querySelectorAll('.value-list li');
      [1,2,3].forEach(function(n,j){ if(lis[j]) lis[j].textContent=t(vData[i][n]); });
    });

    // HOSTS
    q('#hosts .section-eyebrow', t('about_host_eyebrow'));
    q('#hosts .section-title', t('about_host_title'));
    q('#hosts .section-desc', t('about_host_desc'));
    var hCards = document.querySelectorAll('.host-card');
    var hData = [
      ['about_hcard1_badge','about_hcard1_title','about_hcard1_p'],
      ['about_hcard2_badge','about_hcard2_title','about_hcard2_p'],
      ['about_hcard3_badge','about_hcard3_title','about_hcard3_p'],
      ['about_hcard4_badge','about_hcard4_title','about_hcard4_p'],
    ];
    hCards.forEach(function(card,i){
      if(!hData[i]) return;
      var badge=card.querySelector('.host-badge'); if(badge) badge.textContent=t(hData[i][0]);
      var ht=card.querySelector('.host-card-title'); if(ht) ht.textContent=t(hData[i][1]);
      var hp=card.querySelector('p'); if(hp) hp.textContent=t(hData[i][2]);
    });
    q('.host-qualify-label', t('about_qualify_label'));
    q('.host-qualify p', t('about_qualify_p'));

    // PROCESS
    q('#process .section-eyebrow', t('about_proc_eyebrow'));
    q('#process .section-title', t('about_proc_title'));
    q('#process .section-desc', t('about_proc_desc'));
    var pSteps = document.querySelectorAll('.process-step');
    var pData = [
      ['about_step1_title','about_step1_desc',null],
      ['about_step2_title','about_step2_desc',null],
      ['about_step3_title','about_step3_desc','about_step3_note'],
      ['about_step4_title','about_step4_desc',null],
      ['about_step5_title','about_step5_desc','about_step5_note'],
    ];
    pSteps.forEach(function(step,i){
      if(!pData[i]) return;
      var st=step.querySelector('.step-title'); if(st) st.textContent=t(pData[i][0]);
      var sd=step.querySelector('.step-desc'); if(sd) sd.textContent=t(pData[i][1]);
      if(pData[i][2]){ var sn=step.querySelector('.step-note'); if(sn) sn.textContent=t(pData[i][2]); }
    });

    // CONTACT
    q('#contact .section-eyebrow', t('about_contact_eyebrow'));
    q('#contact .section-title', t('about_contact_title'));
    q('#contact .section-desc', t('about_contact_desc'));
    var cCards = document.querySelectorAll('.contact-card');
    if(cCards[0]){ cCards[0].querySelector('.contact-name').textContent=t('about_cc1_name'); cCards[0].querySelector('.contact-value').textContent=t('about_cc1_val'); }
    if(cCards[1]){ cCards[1].querySelector('.contact-name').textContent=t('about_cc2_name'); qh('#contact .contact-card:nth-child(2) .contact-value', t('about_cc2_val')); }
    q('#contact a[href="/"]', t('about_back'));
  }

  // apply.html 전용 번역 함수
  function applyTranslationsApply(){
    var t = window.kpopT;
    function setText(id, txt){ var el=document.getElementById(id); if(el) el.textContent=txt; }
    function setHTML(id, html){ var el=document.getElementById(id); if(el) el.innerHTML=html; }
    function q(sel, txt, html){
      var el=document.querySelector(sel);
      if(!el) return;
      if(html !== undefined) el.innerHTML = html;
      else el.textContent = txt;
    }

    // html lang
    document.documentElement.lang = lang==='zh_t'?'zh-TW':lang==='zh_s'?'zh-CN':lang==='ja'?'ja':lang==='id'?'id':lang==='ko'?'ko':'en';

    // NAV
    q('.btn-back', t('apply_back'));
    // 언어 선택기 현재 라벨
    var lbl = document.getElementById('kpopLangCurLabel');
    if(lbl) lbl.textContent = window.KPOP_LANG_LABEL || 'EN';

    // 신청 마감 메시지 (applyClosedMsg 존재 시)
    var closedMsg = document.getElementById('applyClosedMsg');
    if(closedMsg) closedMsg.innerHTML = t('apply_closed_msg');

    // PAGE HEADER
    q('.page-eyebrow', t('apply_eyebrow'));
    var isClosed = !!document.getElementById('applyClosedMsg');
    q('.page-title', isClosed ? t('apply_closed_title') : t('apply_title'));
    q('.page-sub', isClosed ? t('apply_closed_sub') : t('apply_sub'));

    // FORM HEADER
    q('.apply-form-header h2', t('apply_form_h2'));
    q('.apply-form-header p', t('apply_form_sub'));

    // STEPS
    var steps = document.querySelectorAll('.apply-step-label');
    var stepKeys = ['apply_step1','apply_step2','apply_step3'];
    steps.forEach(function(el,i){ if(stepKeys[i]) el.textContent = t(stepKeys[i]); });

    // STEP1 section title
    var secTitles = document.querySelectorAll('.form-section-title');
    if(secTitles[0]) secTitles[0].textContent = t('apply_sec1');

    // Stay type label
    q('#page1 .form-label', t('apply_stay_type'));
    var rcStay = document.querySelectorAll('#rc-stayType .radio-card');
    var stayData = [
      ['apply_private_title','apply_private_desc'],
      ['apply_shared_title','apply_shared_desc'],
      ['apply_flex_title','apply_flex_desc']
    ];
    rcStay.forEach(function(card,i){
      var ti = card.querySelector('.rc-title'); if(ti) ti.textContent = t(stayData[i][0]);
      var de = card.querySelector('.rc-desc'); if(de) de.textContent = t(stayData[i][1]);
    });
    q('#err-stayType', t('apply_err_stay'));

    // Guest count
    var gcLabel = document.querySelector('label[for="guestCount"]'); if(gcLabel) gcLabel.textContent = t('apply_guest_count');
    var gcSel = document.getElementById('guestCount');
    if(gcSel){
      gcSel.options[0].text = t('apply_count_placeholder');
      gcSel.options[1].text = t('apply_count_1');
      gcSel.options[2].text = t('apply_count_2');
      gcSel.options[3].text = t('apply_count_3');
      gcSel.options[4].text = t('apply_count_4');
    }
    q('#err-guestCount', t('apply_err_count'));

    // Gender
    var genderLabels = document.querySelectorAll('#rc-gender .rc-title');
    ['apply_female','apply_male','apply_other'].forEach(function(k,i){ if(genderLabels[i]) genderLabels[i].textContent=t(k); });
    q('#err-gender', t('apply_err_gender'));

    // Bed
    var page1Labels = document.querySelectorAll('#page1 .form-label');
    // bed label은 3번째 form-label
    if(page1Labels[2]) page1Labels[2].textContent = t('apply_bed');
    var bedLabels = document.querySelectorAll('#rc-bedRequired .rc-title');
    if(bedLabels[0]) bedLabels[0].textContent = t('apply_bed_yes');
    if(bedLabels[1]) bedLabels[1].textContent = t('apply_bed_no');
    q('#err-bedRequired', t('apply_err_bed'));

    // Dates
    var dateLabels = document.querySelectorAll('.form-row .form-label');
    if(dateLabels[0]) dateLabels[0].textContent = t('apply_checkin');
    if(dateLabels[1]) dateLabels[1].textContent = t('apply_checkout');
    // placeholder
    var dispIn = document.getElementById('dpDisplayIn');
    if(dispIn && dispIn.classList.contains('placeholder')) dispIn.textContent = t('apply_date_placeholder');
    var dispOut = document.getElementById('dpDisplayOut');
    if(dispOut && dispOut.classList.contains('placeholder')) dispOut.textContent = t('apply_date_placeholder');
    q('#err-checkIn', t('apply_err_checkin'));
    q('#err-checkOut', t('apply_err_checkout'));
    var dateNote = document.querySelector('#page1 > p');
    if(dateNote) dateNote.textContent = t('apply_date_note');

    // STEP2 section title
    if(secTitles[1]) secTitles[1].textContent = t('apply_sec2');
    var nameLabel = document.querySelector('label[for="guestName"]'); if(nameLabel) nameLabel.textContent = t('apply_name');
    var nameInp = document.getElementById('guestName'); if(nameInp) nameInp.placeholder = t('apply_name_placeholder');
    q('#err-guestName', t('apply_err_name'));
    var natLabel = document.querySelector('label[for="nationality"]'); if(natLabel) natLabel.firstChild.textContent = t('apply_nationality')+' ';
    var natSel = document.getElementById('nationality'); if(natSel && natSel.options[0]) natSel.options[0].text = t('apply_nationality_placeholder');
    q('#err-nationality', t('apply_err_nationality'));
    var phoneLabels = document.querySelectorAll('#page2 .form-label');
    phoneLabels.forEach(function(el){
      if(el.textContent.trim()==='Phone Number'||el.textContent.trim()==='電話番号'||el.textContent.trim()==='電話號碼'||el.textContent.trim()==='电话号码'||el.textContent.trim()==='Nomor Telepon'||el.textContent.trim()==='전화번호') el.textContent=t('apply_phone');
    });
    var phoneInp = document.getElementById('phoneNumber'); if(phoneInp) phoneInp.placeholder = t('apply_phone_placeholder');
    q('#err-phone', t('apply_err_phone'));
    var emailLabel = document.querySelector('label[for="email"]'); if(emailLabel) emailLabel.textContent = t('apply_email');
    var emailInp = document.getElementById('email'); if(emailInp) emailInp.placeholder = t('apply_email_placeholder');
    q('#err-email', t('apply_err_email'));
    q('#err-language', t('apply_err_language'));

    // STEP3 section title
    if(secTitles[2]) secTitles[2].textContent = t('apply_sec3');
    var armyCards = document.querySelectorAll('#rc-armyProof .radio-card');
    var armyData = [['apply_weverse_title','apply_weverse_desc'],['apply_ticket_title','apply_ticket_desc'],['apply_fanclub_title','apply_fanclub_desc']];
    armyCards.forEach(function(card,i){
      var ti=card.querySelector('.rc-title'); if(ti) ti.textContent=t(armyData[i][0]);
      var de=card.querySelector('.rc-desc'); if(de) de.textContent=t(armyData[i][1]);
    });
    q('#err-armyProof', t('apply_err_army'));

    // Upload
    var uploadLabel = document.querySelector('.form-group .form-label[for=""]') || (function(){
      var ls=document.querySelectorAll('#page3 .form-label'); return ls[1]||null;
    })();
    var page3Labels = document.querySelectorAll('#page3 .form-label');
    if(page3Labels[1]) page3Labels[1].textContent = t('apply_upload');
    var uploadPs = document.querySelectorAll('.file-upload-area p');
    if(uploadPs[0]) uploadPs[0].textContent = t('apply_upload_click');
    q('#err-armyProofFile', t('apply_err_file'));

    var wehomeLabel = document.querySelector('label[for="wehomeId"]'); if(wehomeLabel) wehomeLabel.textContent = t('apply_wehome_id');
    var wehomeInp = document.getElementById('wehomeId'); if(wehomeInp) wehomeInp.placeholder = t('apply_wehome_placeholder');
    // Referral
    var refLabel = document.querySelector('label[for="referralSource"]');
    if(refLabel) refLabel.firstChild.textContent = t('apply_referral_label')+' ';
    var refCards = document.querySelectorAll('#cc-referral .checkbox-card');
    var refMap = {
      'theqoo':        'apply_referral_theqoo',
      'naver':         'apply_referral_naver',
      'visitkorea':    'apply_referral_visitkorea',
      'fan_community': 'apply_referral_fan_community',
      'friend':        'apply_referral_friend',
      'baovanhoa':     'apply_referral_baovanhoa',
      'kmmbox':        'apply_referral_kmmbox'
    };
    refCards.forEach(function(card){
      var inp = card.querySelector('input');
      if(inp && refMap[inp.value]) card.lastChild.textContent = t(refMap[inp.value]);
    });

    var commentsLabel = document.querySelector('label[for="comments"]'); if(commentsLabel) commentsLabel.textContent = t('apply_comments');
    var commentsTA = document.getElementById('comments'); if(commentsTA) commentsTA.placeholder = t('apply_comments_placeholder');

    // Deposit card
    var depositCard = document.querySelector('.agree-card + .form-error, #page3 > .form-group > div[style*="fffbeb"]') ||
      document.querySelector('#page3 div[style*="fffbeb"]');
    if(depositCard){
      var dTitle = depositCard.querySelector('strong'); if(dTitle) dTitle.textContent = t('apply_deposit_title');
      var dBody = depositCard.querySelector('div[style]'); if(dBody) dBody.innerHTML = '<strong style="display:block;margin-bottom:4px;font-size:0.85rem;color:#78350f;">'+t('apply_deposit_title')+'</strong>'+t('apply_deposit_body');
    }

    // Agree texts
    var agreeProject = document.querySelector('#agreeProjectCard .agree-text'); if(agreeProject) agreeProject.innerHTML = t('apply_agree_project');
    q('#err-agreeProject', t('apply_err_project'));
    var agreeDeposit = document.querySelector('#agreeDepositCard .agree-text'); if(agreeDeposit) agreeDeposit.innerHTML = t('apply_agree_deposit');
    q('#err-agreeDeposit', t('apply_err_deposit'));
    var agreeTerms = document.querySelector('#agreeCard .agree-text'); if(agreeTerms) agreeTerms.innerHTML = t('apply_agree_terms');
    q('#err-agree', t('apply_err_agree'));

    // Buttons
    q('#btnBack', t('apply_btn_back'));
    var btnNext = document.getElementById('btnNext');
    if(btnNext && btnNext.textContent.indexOf('Submit')===-1 && btnNext.textContent.indexOf('申請')===-1 && btnNext.textContent.indexOf('Kirim')===-1){
      btnNext.textContent = (window._currentApplyPage===3) ? t('apply_btn_submit') : t('apply_btn_continue');
    }

    // Success
    q('.success-title', t('apply_success_title'));
    var succDesc = document.querySelector('.success-desc'); if(succDesc) succDesc.innerHTML = t('apply_success_desc');

    // FOOTER
    q('a[href="/host"].footer-link', t('footer_host'));
    q('a[href="mailto:cs@wehome.me"].footer-link', t('footer_cs'));
  }

  function applyTranslationsChallenge(){
    var t = window.kpopT;
    function q(sel, html){ var el=document.querySelector(sel); if(el) el.innerHTML=html; }
    // nav
    var chNavLink = document.querySelector('.nav-link[href="/challenge"]');
    if(chNavLink) chNavLink.textContent = t('ch_nav');
    var chMobileLink = document.querySelector('.mobile-link[href="/challenge"]');
    if(chMobileLink) chMobileLink.textContent = t('ch_nav');

    // hero
    q('.hero-eyebrow', t('ch_hero_eyebrow'));
    var h1 = document.querySelector('.challenge-hero h1'); if(h1) h1.innerHTML = t('ch_hero_title');
    var hp = document.querySelector('.challenge-hero p'); if(hp) hp.innerHTML = t('ch_hero_p');

    // poster section
    q('.poster-section-header .eyebrow', t('ch_poster_eyebrow'));
    q('.poster-section-header h2', t('ch_poster_title'));
    var pd = document.querySelector('.poster-section-header p'); if(pd) pd.innerHTML = t('ch_poster_desc');

    // event card
    var evtLoc = document.querySelector('.poster-event-title'); if(evtLoc) evtLoc.lastChild.textContent = ' '+t('ch_event_loc');
    var evtSteps = document.querySelectorAll('.poster-event-step');
    if(evtSteps[0]){ evtSteps[0].querySelector('strong').textContent=t('ch_event_s1_title'); var p=evtSteps[0].querySelector('p'); if(p) p.innerHTML=t('ch_event_s1_desc'); }
    if(evtSteps[1]){ evtSteps[1].querySelector('strong').textContent=t('ch_event_s2_title'); var p=evtSteps[1].querySelector('p'); if(p) p.innerHTML=t('ch_event_s2_desc'); }
    if(evtSteps[2]){ evtSteps[2].querySelector('strong').innerHTML=t('ch_event_s3_title'); var p=evtSteps[2].querySelector('p'); if(p) p.innerHTML=t('ch_event_s3_desc'); }
    var prizeEls = document.querySelectorAll('.poster-prize-tag');
    if(prizeEls[0]) prizeEls[0].textContent = t('ch_event_prize1');
    if(prizeEls[1]) prizeEls[1].textContent = t('ch_event_prize2');
    var prizesLabel = document.querySelector('.poster-event-prizes'); if(prizesLabel) prizesLabel.firstChild.textContent = t('ch_event_prizes_label');

    // gallery header
    q('.gallery-header .eyebrow', t('ch_gallery_eyebrow'));
    q('.gallery-header h2', t('ch_gallery_title'));
    var gdesc = document.querySelector('.gallery-header p'); if(gdesc) gdesc.textContent = t('ch_gallery_desc');
    var gshare = document.querySelector('.btn-share-gallery'); if(gshare) gshare.lastChild.textContent = ' '+t('ch_gallery_share');

    // counter
    q('.gallery-counter-label', t('ch_gallery_counter_label'));

    // filter buttons
    var fbtns = document.querySelectorAll('.gallery-filter-btn');
    if(fbtns[0]){ fbtns[0].firstChild.textContent = t('ch_gallery_filter_all')+' '; }
    if(fbtns[1]){ fbtns[1].firstChild.textContent = t('ch_gallery_filter_insta')+' '; }
    if(fbtns[2]){ fbtns[2].firstChild.textContent = t('ch_gallery_filter_upload')+' '; }

    // load more
    q('#btnLoadMore', t('ch_gallery_loadmore'));

    // empty state
    var ecards = document.querySelectorAll('.gallery-empty-card');
    if(ecards[0]){ var h4=ecards[0].querySelector('h4'); if(h4) h4.innerHTML=t('ch_empty_title1'); var p=ecards[0].querySelector('p'); if(p) p.textContent=t('ch_empty_desc1'); }
    if(ecards[1]){ var h4=ecards[1].querySelector('h4'); if(h4) h4.innerHTML=t('ch_empty_title2'); var p=ecards[1].querySelector('p'); if(p) p.innerHTML=t('ch_empty_desc2'); }
    if(ecards[2]){ var h4=ecards[2].querySelector('h4'); if(h4) h4.innerHTML=t('ch_empty_title3'); var p=ecards[2].querySelector('p'); if(p) p.textContent=t('ch_empty_desc3'); }
    var ectap = document.querySelector('.gallery-empty-cta p'); if(ectap) ectap.innerHTML = t('ch_empty_cta');

    // modal
    q('.modal-header-text .eyebrow2', t('ch_modal_eyebrow'));
    q('#modalTitle', t('ch_modal_title'));
    var tabs = document.querySelectorAll('.modal-tab');
    if(tabs[0]) tabs[0].lastChild.textContent = ' '+t('ch_modal_tab_insta');
    if(tabs[1]) tabs[1].lastChild.textContent = ' '+t('ch_modal_tab_upload');
    var instaSubP = document.querySelector('#tabInstagram .sub'); if(instaSubP) instaSubP.textContent = t('ch_modal_insta_sub');
    var instaUrlLabel = document.querySelector('#tabInstagram label[for="instaUrl"]'); if(instaUrlLabel) instaUrlLabel.firstChild.textContent = t('ch_modal_insta_url_label')+' ';
    q('#instaUrl', null, 'placeholder', null);
    var subNameLabel = document.querySelector('label[for="subName"]'); if(subNameLabel) subNameLabel.textContent = t('ch_modal_name_label');
    var subName = document.getElementById('subName'); if(subName) subName.placeholder = t('ch_modal_name_ph');
    var subEmailLabel = document.querySelector('label[for="subEmail"]'); if(subEmailLabel) subEmailLabel.textContent = t('ch_modal_email_label');
    var subNoteLabel = document.querySelector('label[for="subNote"]'); if(subNoteLabel) subNoteLabel.textContent = t('ch_modal_note_label');
    var subNote = document.getElementById('subNote'); if(subNote) subNote.placeholder = t('ch_modal_note_ph');
    var btnInsta = document.getElementById('submitBtnInsta'); if(btnInsta) btnInsta.innerHTML = t('ch_modal_btn_insta');

    var uploadSubP = document.querySelector('#tabUpload .sub'); if(uploadSubP) uploadSubP.textContent = t('ch_modal_upload_sub');
    var photoLabel = document.querySelector('label[for="photoFile"]');
    if(!photoLabel){ var allLabels=document.querySelectorAll('#tabUpload label'); photoLabel=allLabels[0]||null; }
    if(photoLabel){ photoLabel.firstChild.textContent = t('ch_modal_photo_label')+' '; }
    var uptoSpan = document.querySelector('.form-group span[style*="text-300"]'); if(uptoSpan) uptoSpan.textContent = t('ch_modal_photo_up_to');
    var dropP = document.querySelector('.photo-dropzone p'); if(dropP) dropP.innerHTML = t('ch_modal_photo_tap');
    var dropSmall = document.querySelector('.photo-dropzone small'); if(dropSmall) dropSmall.innerHTML = t('ch_modal_photo_hint');
    var captionLabel = document.querySelector('label[for="uploadCaption"]'); if(captionLabel) captionLabel.textContent = t('ch_modal_caption_label');
    var captionTA = document.getElementById('uploadCaption'); if(captionTA) captionTA.placeholder = t('ch_modal_caption_ph');
    var uploadNameLabel = document.querySelector('label[for="uploadName"]'); if(uploadNameLabel) uploadNameLabel.textContent = t('ch_modal_name_label');
    var uploadName = document.getElementById('uploadName'); if(uploadName) uploadName.placeholder = t('ch_modal_name_ph');
    var uploadEmailLabel = document.querySelector('label[for="uploadEmail"]'); if(uploadEmailLabel) uploadEmailLabel.textContent = t('ch_modal_email_label');
    var uploadNoteLabel = document.querySelector('label[for="uploadNote"]'); if(uploadNoteLabel) uploadNoteLabel.textContent = t('ch_modal_upload_note_label');
    var btnUpload = document.getElementById('submitBtnUpload'); if(btnUpload) btnUpload.innerHTML = t('ch_modal_btn_upload');

    // reward banner
    var rLabel = document.getElementById('rewardLabel'); if(rLabel) rLabel.textContent = t('ch_reward_label');
    var rTitle = document.getElementById('rewardTitle'); if(rTitle) rTitle.innerHTML = t('ch_reward_title');
    var rSub   = document.getElementById('rewardSub');   if(rSub)   rSub.textContent  = t('ch_reward_sub');
    var rBtn   = document.getElementById('rewardBtnText'); if(rBtn) rBtn.textContent  = t('ch_reward_btn');
  }

  var _path = location.pathname;
  var IS_APPLY_PAGE  = (_path.indexOf('apply') !== -1);
  var IS_ABOUT_PAGE  = (_path === '/about' || _path === '/about.html');
  var IS_TGUIDE_PAGE = (_path === '/travel-guide' || _path === '/travel-guide.html');
  var IS_GGB_PAGE    = (_path === '/guest-guidebook' || _path === '/guest-guidebook.html');
  var IS_CHALLENGE_PAGE = (_path === '/challenge' || _path === '/challenge.html');

  function _runTranslation(){
    if(IS_APPLY_PAGE)       applyTranslationsApply();
    else if(IS_ABOUT_PAGE)  applyTranslationsAbout();
    else if(IS_TGUIDE_PAGE) applyTranslationsTravelGuide();
    else if(IS_GGB_PAGE)    applyTranslationsGuestGuidebook();
    else if(IS_CHALLENGE_PAGE) applyTranslationsChallenge();
    else applyTranslations();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', _runTranslation);
  } else {
    _runTranslation();
  }
})();
