$(document).ready(function () {
  const projects = $('#projects')
  const modal = $(".modal");
  const span = $(".close");

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
            <div class="button modal-link">Mehr</div>
          </div>
        </div>
      </div>`;

      projects.append(project);
    });
  });

  projects.on('click', '.modal-link', function () {
    const button = $(this);
    const project = button.parents('.project');
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
});