import React from 'react';

class Doldolyi extends React.Component {

    /**
     * Doldolyi의 생성자
     * @constructs
     * @param {Doldolyi.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * Doldolyi을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div>Hello Doldolyi!</div>
        );
    }
}

/**
 * Doldolyi의 Props 인터페이스 정의
 */
Doldolyi.propTypes = {};

/**
 * Doldolyi의 Props 기본값 정의
 */
Doldolyi.defaultProps = {};

export default Doldolyi;
