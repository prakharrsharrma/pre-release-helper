import type {
  TCipPhases,
  CipTeamMember,
  CipGenFormValues,
} from 'src/sections/cip-gen/types/cip-gen-form';

import { useFormContext } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Button, TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { snakeCaseToTitleCase } from 'src/utils/helpers';
import { CIP_PHASES, PHASES_COLOR_MAP } from 'src/utils/constants';

type TMappingModalProps = {
  open: boolean;
  handleClose: () => void;
  scroll: 'paper' | 'body';
};

type TEditableTeamMemberField = Exclude<keyof CipTeamMember, 'location'>;
type TTeamMemberDraft = Record<TCipPhases, Record<TEditableTeamMemberField, string>>;

const EDITABLE_TEAM_MEMBER_FIELDS: TEditableTeamMemberField[] = [
  'name',
  'role',
  'email',
  'contactNumbers',
];

const createEmptyTeamMemberDrafts = (): TTeamMemberDraft =>
  CIP_PHASES.reduce(
    (drafts, location) => ({
      ...drafts,
      [location]: {
        name: '',
        role: '',
        email: '',
        contactNumbers: '',
      },
    }),
    {} as TTeamMemberDraft
  );

const createTeamMemberDrafts = (teamMembers: CipTeamMember[] = []): TTeamMemberDraft => {
  const drafts = createEmptyTeamMemberDrafts();

  teamMembers.forEach((teamMember, index) => {
    const location = teamMember.location ?? CIP_PHASES[index];

    if (!location) {
      return;
    }

    drafts[location] = {
      name: teamMember.name ?? '',
      role: teamMember.role ?? '',
      email: teamMember.email ?? '',
      contactNumbers: teamMember.contactNumbers ?? '',
    };
  });

  return drafts;
};

const createTeamMembersFromDrafts = (draftTeamMembers: TTeamMemberDraft): CipTeamMember[] =>
  CIP_PHASES.map((location) => ({
    location,
    ...draftTeamMembers[location],
  }));

const MappingModal = (props: TMappingModalProps) => {
  const { open, handleClose } = props;
  const [draftTeamMembers, setDraftTeamMembers] = useState<TTeamMemberDraft>(
    createEmptyTeamMemberDrafts
  );

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const { getValues, setValue } = useFormContext<CipGenFormValues>();

  useEffect(() => {
    if (open) {
      setDraftTeamMembers(createTeamMemberDrafts(getValues('teamMembers')));
    }
  }, [getValues, open]);

  const handleFieldChange = (
    location: TCipPhases,
    key: TEditableTeamMemberField,
    value: string
  ) => {
    setDraftTeamMembers((currentTeamMembers) => ({
      ...currentTeamMembers,
      [location]: {
        ...currentTeamMembers[location],
        [key]: value,
      },
    }));
  };

  const handleCancel = () => {
    setDraftTeamMembers(createEmptyTeamMemberDrafts());
    handleClose();
  };

  const handleSave = () => {
    setValue('teamMembers', createTeamMembersFromDrafts(draftTeamMembers), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setDraftTeamMembers(createEmptyTeamMemberDrafts());
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="user-to-phase-mapping-dialog-title"
      aria-describedby="user-to-phase-mapping-dialog-description"
    >
      <DialogTitle
        className="shadow-inner text-gray-600 flex items-center justify-between"
        variant="h4"
        id="user-to-phase-mapping-dialog-title"
      >
        <span>Map Users to CIP Phases</span>
        <div className="flex items-center gap-2">
          <Button color="inherit" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSave}>
            Save Mapping
          </Button>
        </div>
      </DialogTitle>
      <DialogContent className="p-0 space-y-4 pb-4">
        {CIP_PHASES.map((location, index) => (
          <div
            key={location}
            className="w-full flex flex-col items-start space-y-2 mt-2 px-4 py-1 border-l-[5px]"
            style={{
              borderColor: PHASES_COLOR_MAP[location],
            }}
          >
            <DialogContentText
              id={`user-to-phase-mapping-dialog-description-${location}`}
              ref={index === 0 ? descriptionElementRef : undefined}
              tabIndex={-1}
              variant="h5"
              style={{ color: PHASES_COLOR_MAP[location] }}
            >
              {snakeCaseToTitleCase(location)}
            </DialogContentText>
            <Grid container rowSpacing={3} columnSpacing={3}>
              {EDITABLE_TEAM_MEMBER_FIELDS.map((key) => (
                <Grid key={key} size={6}>
                  <TextField
                    autoComplete="off"
                    id={`teamMembers[${index}].${key}`}
                    fullWidth
                    label={snakeCaseToTitleCase(key)}
                    value={draftTeamMembers[location][key]}
                    onChange={(event) => handleFieldChange(location, key, event.target.value)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default MappingModal;
