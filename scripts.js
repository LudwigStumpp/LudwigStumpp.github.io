$(document).ready(function () {
  const projects = $('#projects')
  const modal = $('.modal');
  const span = $('.close');
  const wrapper = $('#wrapper')

  const checkSize = () => {
    if (wrapper.css('margin-top') == '50px') {
      // small device
      projects.find('.project').addClass('modal-link')
    } else {
      projects.find('.project').removeClass('modal-link')
    }
  }

  $.getJSON('entries/projects.json', (data) => {
    $.each(data, function (key, val) {
      const imgUrl = val.imgUrl;
      const backgroundPosition = val.backgroundPosition;
      const name = val.name;
      const text = val.text;
      const link = val.link;

      style = 'background-image:url(${imgUrl})'

      const project = `<div class="project" style='background-image:url(${imgUrl}); background-position:${backgroundPosition}' name='${name}' text='${text}' link='${link}'>
          <div class="info">
            <div class="title">${name}</div>
            <div class="button modal-link">More</div>
          </div>
        </div>
      </div>`;

      projects.append(project);
    });
    checkSize();
  });

  projects.on('click', '.modal-link', function () {
    const project = $(this)[0].classList[0] == 'project' ? $(this) : $(this).parents('.project')
    const name = project.attr('name');
    const text = project.attr('text');
    const link = project.attr('link');

    modal.find('.title').text(name);
    modal.find('.text').text(text);
    modal.find('.link').attr('href', link);
    modal.css("display", "block");
  })

  span.click(() => {
    modal.css("display", "none")
  })

  $(window).click((e) => {
    if (e.target == modal[0]) {
      modal.css("display", "none")
    }
  })

  $(window).resize(checkSize);
});