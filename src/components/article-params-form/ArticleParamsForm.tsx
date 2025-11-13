import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const asideRef = useRef<HTMLDivElement>(null);

	// Локальное состояние формы
	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState); // Меняем глобальное состояние формы
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]); // Срабатывает только если изменилась зависимость

	return (
		<div ref={asideRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
					console.log(`click: ${isOpen}`);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleApply}>
					<div className={styles.mainContainer}>
						{/* Заголовок */}
						<Text as='h2' weight={800} size={31} uppercase>
							Задайте параметры
						</Text>
						{/* Выбор шрифта */}
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option: OptionType) =>
								setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
							}
						/>
						{/* Размер шрифта */}
						<RadioGroup
							name='font-size'
							title='Размер шрифта'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option: OptionType) =>
								setFormState((prev) => ({ ...prev, fontSizeOption: option }))
							}
						/>
						{/* Цвет шрифта */}
						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option: OptionType) =>
								setFormState((prev) => ({ ...prev, fontColor: option }))
							}
						/>
						{/* Разделитель*/}
						<Separator />
						{/* Цвет фона */}
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option: OptionType) =>
								setFormState((prev) => ({ ...prev, backgroundColor: option }))
							}
						/>
						{/* Ширина контента */}
						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(option: OptionType) =>
								setFormState((prev) => ({ ...prev, contentWidth: option }))
							}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
