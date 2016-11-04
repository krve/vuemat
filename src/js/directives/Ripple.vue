<script>
    export default {
        inserted(el) {
            new RippleContainer(el);
        }
    }

    class RippleContainer
    {
        constructor(element) {
            this.element = element;
            this.ripples = [];

            if (this.element.classList.contains('disabled')) return;

            this.init();

            this.element.addEventListener('mousedown', e => {
                this.create(e);
            });
        }

        init() {
            this.element.innerHTML += '<div class="md-ink-ripple"></div>';
            this.element.classList.add('has-ripple');
        }

        create(e) {
            this.ripples.push(
                new Ripple(this.element, e)
            );
        }
    }

    class Ripple
    {
        constructor(element, e) {
            this.element = element;
            this.ripple = document.createElement('DIV');
            this.ripple.classList.add('md-ripple');
            this.element.querySelector('.md-ink-ripple').appendChild(this.ripple);

            this.init(e);
        }

        init(e) {
            var elWidth = this.element.offsetWidth,
                elHeight = this.element.offsetHeight;
            var rippleSize = ((elWidth < elHeight) ? elHeight : elWidth);

            this.ripple.classList.remove('active');

            var boundingBox = this.element.getBoundingClientRect();

            var leftOffset = (e.clientX - boundingBox.left) - rippleSize / 2;
            var topOffset = (e.clientY - boundingBox.top) - rippleSize / 2;

            if (this.element.classList.contains('md-icon-button')) {
                leftOffset = 0;
                topOffset = 0;
            }

            this.ripple.style.width = rippleSize + 'px';
            this.ripple.style.height = rippleSize + 'px';
            this.ripple.style.left = leftOffset + 'px';
            this.ripple.style.top = topOffset + 'px';
            this.ripple.classList.add('active');

            document.addEventListener('mouseup', () => {
                this.remove();
            });
        }

        /**
         * Remove the ripple
         */
        remove() {
            this.ripple.classList.add('active-out');

            setTimeout(() => {
                this.ripple.remove();
            }, 1000);
        }
    }
</script>
