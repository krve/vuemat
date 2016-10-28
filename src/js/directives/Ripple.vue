<script>
    var template = `<div class="md-ink-ripple">
<div class="md-ripple"></div></div>
`;

    export default {
        inserted(el) {
            el.innerHTML += template;
            el.classList.add('has-ripple');

            var rippler = el.querySelector('.md-ripple');

            el.addEventListener('mousedown', e => {
                var elWidth = el.offsetWidth,
                    elHeight = el.offsetHeight;
                var rippleSize = ((elWidth < elHeight) ? elHeight : elWidth);

                rippler.classList.remove('active');

                var boundingBox = el.getBoundingClientRect();

                var leftOffset = (e.clientX - boundingBox.left) - rippleSize / 2;
                var topOffset = (e.clientY - boundingBox.top) - rippleSize / 2;

                if (el.classList.contains('md-icon-button')) {
                    leftOffset = 0;
                    topOffset = 0;
                }

                setTimeout(() => {
                    rippler.style.width = rippleSize + 'px';
                    rippler.style.height = rippleSize + 'px';
                    rippler.style.left = leftOffset + 'px';
                    rippler.style.top = topOffset + 'px';
                    rippler.classList.add('active');

                    setTimeout(() => {
                        rippler.classList.remove('active');
                    }, 1000);
                }, 10);
            });
        }
    }
</script>
