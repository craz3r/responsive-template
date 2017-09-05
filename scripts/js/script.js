function ready() {
    if(window.innerWidth < 980) {
        var h = getComputedStyle(document.querySelector('.page-header'));
        var m = document.querySelector('#menu');
        var menu = document.querySelector('.page-header i');
        var open = document.querySelector('.nav-thumb');

        window.onresize = function() {
            if(window.innerWidth >= 980) {
                m.style.display = "block";
            } else {
                m.style.display = "none";
            }
            h = getComputedStyle(document.querySelector('.page-header'));
        };

        open.onclick = function(e) {
            m.style.top = h.height;
            if(menu.classList.contains('icon-menu-1')) {
                menu.classList.remove("icon-menu-1");
                menu.classList.add("icon-cancel");
                m.style.display = 'block';
            } else if (menu.classList.contains('icon-cancel')) {
                menu.classList.remove("icon-cancel");
                menu.classList.add("icon-menu-1");
                m.style.display = 'none';
            }

            e.preventDefault();
        };

        m.onclick = function(e) {
            var target = e.target;

            if(target.tagName == 'A') {
                if (menu.classList.contains('icon-cancel')) {
                    menu.classList.remove("icon-cancel");
                    menu.classList.add("icon-menu-1");
                    m.style.display = 'none';
                }
            } else {
                return;
            }
        }
    }

    var carousel = document.querySelector(".slider");
    var items = setWidth(carousel.querySelectorAll('.slider-item'), getEqWidth(carousel, '.slider-wrapper', 1));
    var slides  = carousel.querySelector('.slides');
    var sliding = slide(getEqWidth(carousel, '.slider-wrapper', 1), 1, items, slides);

    carousel.querySelector('.slider-next').addEventListener('click', function (e) {
        sliding();
        e.preventDefault();
    });


    var comments = document.querySelector(".comments");
    var commentsList = setWidth(comments.querySelectorAll('.comment'), getEqWidth(comments, '.comments-wrapper', 1));
    var comWrapper = comments.querySelector('.comments ul');
    var commentsSlide = slide(getEqWidth(comments, '.comments-wrapper', 1), 1, commentsList, comWrapper);

    comments.querySelector('.comment-next').addEventListener('click', function(e) {
        commentsSlide();
        e.preventDefault();
    });

    window.onresize = function() {
        commentsList = setWidth(comments.querySelectorAll('.comment'), getEqWidth(comments, '.comments-wrapper', 1));
        commentsSlide = slide(getEqWidth(comments, '.comments-wrapper', 1), 1, commentsList, comWrapper);
        items = setWidth(carousel.querySelectorAll('.slider-item'), getEqWidth(carousel, '.slider-wrapper', 1));
        sliding = slide(getEqWidth(carousel, '.slider-wrapper', 1), 1, items, slides);
    };

}

document.addEventListener("DOMContentLoaded", ready);


function slide(width, count, items, wrapper) {
    var marginL = 0;
    return function() {
        marginL = Math.max(marginL + width * count, 0);
        if(marginL > (items.length - count) * width) {
            wrapper.style.marginLeft = 0 + 'px';
            marginL = 0;
        }
        wrapper.style.marginLeft = -marginL + 'px';
        return marginL;
    }
}

function setWidth(items, width) {
    items.forEach(function (item) {
        item.style.width = width + 'px';
    });
    return items;
}

function getEqWidth(namespace, block, count) {
    return getComputedStyle(namespace.querySelector(block)).width.slice(0,-2) / count;
}