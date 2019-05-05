import classNames from 'classnames';
import omit from 'omit.js';
import toArray from 'rc-util/lib/Children/toArray';
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import KeywordTrigger from './KeywordTrigger';
import Option, { OptionProps } from './Option';
import { getMeasureText, replaceText } from './util';

interface MentionsProps {
  value?: string;
  onChange?: (text: string) => void;
  prefixCls?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}
interface MentionsState {
  value: string;
  measuring: boolean;
  measureText: string;
  measureLocation: number;
  activeIndex: number;
}
class Mentions extends React.Component<MentionsProps, MentionsState> {
  public static Option = Option;

  public static defaultProps = {
    prefixCls: 'rc-mentions',
    prefix: '@',
  };

  public static getDerivedStateFromProps(props: MentionsProps, prevState: MentionsState) {
    const newState: Partial<MentionsState> = {};

    if ('value' in props && props.value !== prevState.value) {
      newState.value = props.value;
    }

    return newState;
  }

  public state = {
    value: '',
    measuring: false,
    measureLocation: 0,
    measureText: '',
    activeIndex: 0,
  };

  public textarea?: HTMLTextAreaElement;
  public measure?: HTMLDivElement;

  public getSnapshotBeforeUpdate() {
    const { measuring } = this.state;
    if (measuring) {
      return this.textarea!.scrollTop;
    }
    return 0;
  }

  public componentDidUpdate(_prevProps: any, _prevState: any, scrollTop: number) {
    const { measuring } = this.state;
    if (measuring) {
      this.measure!.scrollTop = scrollTop;
    }
  }

  public triggerChange = (value: string) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }

    if (onChange) {
      onChange(value);
    }
  };

  public onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    const { measuring, measureLocation } = this.state;
    const { prefix } = this.props;
    this.triggerChange(value);

    // Update measure text
    if (measuring) {
      const measureText = getMeasureText(value, { measureLocation, prefix }).toLowerCase();
      this.setState({ measureText });
    }
  };

  // Check if hit the measure keyword
  public onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    const { key, which } = event;
    const { value, activeIndex, measuring, measureLocation } = this.state;
    const { prefix } = this.props;
    if (prefix === key) {
      // Trigger measure
      const startLoc = this.textarea!.selectionStart;
      this.setState({
        measuring: true,
        measureLocation: startLoc,
        measureText: '',
        activeIndex: 0,
      });
      return;
    }

    // Skip if not measuring
    if (!measuring) {
      return;
    }

    if (which === KeyCode.UP || which === KeyCode.DOWN) {
      // Control arrow function
      const optionLen = this.getOptions().length;
      const offset = which === KeyCode.UP ? -1 : 1;
      const newActiveIndex = (activeIndex + offset + optionLen) % optionLen;
      this.setState({
        activeIndex: newActiveIndex,
      });
      event.preventDefault();
    } else if ([ KeyCode.LEFT, KeyCode.RIGHT, KeyCode.ESC ].indexOf(which) !== -1) {
      // Break measure
      this.setState({
        measuring: false,
      });
      return;
    } else if (which === KeyCode.ENTER) {
      // Measure hit
      const { value: mentionValue = '' } = this.getOptions()[activeIndex] || {};
      this.triggerChange(replaceText(value, {
        measureLocation,
        prefix,
        targetText: mentionValue,
      }));
      this.setState({
        measuring: false,
      });
      event.preventDefault();
    }
  };

  public setTextAreaRef = (element: HTMLTextAreaElement) => {
    this.textarea = element;
  };

  public setMeasureRef = (element: HTMLDivElement) => {
    this.measure = element;
  };

  public getOptions = (): OptionProps[] => {
    const { measureText } = this.state;
    const { children } = this.props;
    const list = toArray(children)
      .map(({ props: { value } }: { props: OptionProps }) => ({
        value,
      }))
      .filter(({ value = '' }: OptionProps) => {
        return value.toLowerCase().indexOf(measureText) !== -1;
      });
    return list;
  };

  public render() {
    const { value, measureLocation, measuring, activeIndex } = this.state;
    const { prefix, prefixCls, className, style, ...restProps } = this.props;

    const props = omit(restProps, [ 'onChange' ]);

    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <textarea
          {...props}
          ref={this.setTextAreaRef}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        {measuring && (
          <div ref={this.setMeasureRef} className={`${prefixCls}-measure`}>
            {value.slice(0, measureLocation)}
            <KeywordTrigger
              prefixCls={prefixCls}
              options={this.getOptions()}
              activeIndex={activeIndex}
              visible={true}
            >
              <span>{prefix}</span>
            </KeywordTrigger>
          </div>
        )}
      </div>
    );
  }
}

polyfill(Mentions);

export default Mentions;
