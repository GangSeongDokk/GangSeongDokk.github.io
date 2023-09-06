const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = xhr.responseText;
    const parser = new DOMParser()
    const contentDiv = document.getElementById("content");
    const headerTag = document.getElementsByTagName("header")[0]

    contentDiv.style.opacity = 0;
    
    let htmlUpdateData;

    // 페이지 내용 업데이트
    if (headerTag === undefined){
      htmlUpdateData = parser.parseFromString(data, "text/html");
      document.replaceChild(htmlUpdateData[0])
    }
    else {
      htmlUpdateData = parser.parseFromString(data, "text/html").body.children;

      contentDiv.replaceChildren()
      for(let i=1; i<htmlUpdateData.length;i++) {
        contentDiv.appendChild(htmlUpdateData[1])
      }
    }

    // contentDiv.replaceChildren()
    // contentDiv.appendChild(htmlUpdateData[0])
    // console.log("????", htmlUpdateData.item(0))
    // contentDiv.appendChild(htmlUpdateData[0])
    // console.log("????", htmlUpdateData.item(0))
    // for(let i=0; i<htmlUpdateData.length;i++) {
    //   contentDiv.appendChild(htmlUpdateData[0])
    // }

    

    // 페이지 전환 애니메이션 (예: fade 효과)
    
    setTimeout(() => {
      contentDiv.style.transition = "opacity 0.5s";
      contentDiv.style.opacity = 1;
    }, 0);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    if (link.classList[0] !== "external") {
      link.addEventListener("click", e => {
        e.preventDefault(); 

        const targetPage = e.target.getAttribute("href");
        xhr.open("GET", targetPage, true);
        xhr.send();

        // 브라우저 URL 업데이트
        history.pushState({}, "", targetPage);
        document.getElementById("nav-btn").checked = false
      });
    }
  });
});

window.onpopstate = e => {
  const targetPage = e.srcElement.location.pathname
  console.log(targetPage)
  xhr.open("GET", targetPage, true);
  xhr.send();
}